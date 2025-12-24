const table = document.getElementById("table");
const playButton = document.getElementById("play");
const moves = document.getElementById("moves");
const score = document.getElementById("score");
const endScore = document.getElementById("gameOver2");

const cellMax = 8;
const rowMax = 10;

let currentRow = 0;
let currentCell = 0;

let points = 0;
let move = 20;

let gameActive = true;


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showInstructions() {
    moves.innerHTML = `Hátralevő lépések: ${move}`
    score.innerHTML = `Pontszám: ${points}`
}

function generateTable() {

    showInstructions()

    for (let i = 0; i < rowMax; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < cellMax; j++) {
            let td = document.createElement("td")
            let rand = randomNumber(0, 100);
            if (rand <= 5) placeImageItem(td, "cookie");
            else if (rand <= 15) placeImageItem(td, "milk");
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

function placeImageItem(td, type) {
    let picture = document.createElement("img")
    picture.src = `images/${type}.png`
    picture.classList.add(type)
    td.appendChild(picture)
}




function addSanta(e) {
    const tempTd = e.target;
    for (const child of tempTd.children) {
        if (child.classList.contains("milk") || child.classList.contains("cookie")) return;
    }
    if (checkSanta()) return;

    currentRow = Number(tempTd.parentNode.rowIndex)
    currentCell = Number(tempTd.cellIndex)
    highlightTrail(currentRow,currentCell);

    const img = document.createElement("img");
    img.classList.add("santa");
    img.src = "images/santa.png"
    tempTd.appendChild(img);
}

function checkSanta() {
    return table.querySelector("img.santa");
}

function deleteCell() {
    return table.rows[currentRow].cells[currentCell].innerText = "";
}

function placeSanta(table) {
    const img = document.createElement("img");
    img.classList.add("santa");
    img.src = "images/santa.png"
    table.rows[currentRow].cells[currentCell].appendChild(img);
}

function showGameOver() {
    document.getElementById("gameOver").classList.add("active");
    endScore.innerHTML = `Pontszám: ${points}`
    document.getElementById("gameOver2").classList.add("active");

    
}

function updateMoveCounter() {
    if (move > 1) {
        --move;
        moves.innerHTML = `Hátralevő lépések: ${move}`
    }
    else {
        showGameOver();
        gameActive = false;
        moves.innerHTML = `Hátralevő lépések: ${0}`
    }
}

function updateScore(point) {
    score.innerHTML = `Pontszám: ${point}`
}

function countPoints(row, cell) {
    const currentTd = table.rows[row].cells[cell]
    if (currentTd.querySelector(".milk")) points += 2;
    else if (currentTd.querySelector(".cookie")) points += 5;

    updateScore(points);

}

function highlightTrail(row,cell){
    const td = table.rows[row].cells[cell];
    const cellClasses = td.classList;
    if (cellClasses.contains("visited")) return;
    cellClasses.add("visited")
}


function updateSantaPosition(newRow, newCell) {
    deleteCell();
    currentRow = newRow;
    currentCell = newCell;
    countPoints(currentRow, currentCell);
    deleteCell();
    placeSanta(table);
    updateMoveCounter();
}

function moveSanta(key) {
    if (!gameActive) return;
    let newCell = currentCell;
    let newRow = currentRow;
    if (key === "ArrowUp") {
        newRow = currentRow - 1;
    }
    if (key === "ArrowLeft") {
        newCell = currentCell - 1;
    }
    if (key === "ArrowRight") {
        newCell = currentCell + 1;
    }
    if (key === "ArrowDown") {
        newRow = currentRow + 1;
    }

    if ((newRow >= rowMax) || (newCell >= cellMax) || !(newCell >= 0) || !(newRow >= 0)) {
        return;
    }

    updateSantaPosition(newRow, newCell);
    highlightTrail(newRow,newCell);
}

document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!arrows.includes(e.key)) return;
    if (!checkSanta()) return;
    e.preventDefault();
    moveSanta(e.key);
})



table.addEventListener("click", addSanta)

playButton.addEventListener("click", generateTable)