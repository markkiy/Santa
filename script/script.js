const table = document.getElementById("table");
const playButton = document.getElementById("play");
const moves = document.getElementById("moves");
const score = document.getElementById("score");

const rowMax = 8;
const cellMax = 10;

let currentRow = 0;
let currentCell = 0;

let points = 0;
let move = 20;




function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showInstructions() {
    moves.innerHTML = `Hátralevő lépések: ${move}`
    score.innerHTML = `Pontszám: ${points}` 
}

function generateTable() {
    showInstructions()

    for (let i = 0; i < cellMax; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < rowMax; j++) {
            let td = document.createElement("td")
            let picture = document.createElement("img")
            if (randomNumber(0, 100) <= 5) {
                picture.src = "images/cookie2.png"
                picture.classList.add("cookie")
                td.appendChild(picture)
            }
            else if (randomNumber(0, 100) <= 15) {
                picture.src = "images/milk3.png"
                picture.classList.add("milk")
                td.appendChild(picture)
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

// document.addEventListener("click", (e) => (
//     console.log(e.target)
// ))


function addSanta(e) {

    const tempTd = e.target;

    

    for (const child of tempTd.children) {
        if (child.classList.contains("milk") || child.classList.contains("cookie")) return;
    }

    if (checkSanta()) return;

    currentRow = Number(tempTd.parentNode.rowIndex)
    currentCell = Number(tempTd.cellIndex)

    
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

function generateSanta(table) {
    const img = document.createElement("img");
    img.classList.add("santa");
    img.src = "images/santa.png"
    table.rows[currentRow].cells[currentCell].appendChild(img);
}

function showGameOver() {
    document.getElementById("gameOver").classList.add("active");
    moves.innerHTML = `Hátralevő lépések: ${0}`
}


document.addEventListener("keydown", (e) => {
    const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!arrows.includes(e.key)) return;
    if (!checkSanta()) return;
    e.preventDefault();
    if (move > 1) {
        move--;
        moves.innerHTML = `Hátralevő lépések: ${move}`
    }
    else if(move == 1){
        showGameOver();
        return;
    }



    deleteCell()
    if (e.key === "ArrowUp") {
        currentRow--;
        deleteCell();
        generateSanta(table);

    }
    if (e.key === "ArrowLeft") {
        currentCell--;
        deleteCell();
        generateSanta(table);
    }
    if (e.key === "ArrowRight") {
        currentCell++;
        deleteCell();
        generateSanta(table);
    }
    if (e.key === "ArrowDown") {
        currentRow++;
        deleteCell();
        generateSanta(table);
    }
})




table.addEventListener("click", addSanta)

playButton.addEventListener("click", generateTable)