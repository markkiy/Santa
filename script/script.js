const table = document.getElementById("table");
const playButton = document.getElementById("play");
const moves = document.getElementById("moves");
const score = document.getElementById("score");

const rowMax = 8;
const cellMax = 10;





function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateTable() {
    for (let i = 0; i < cellMax; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < rowMax; j++) {
            let td = document.createElement("td")
            let picture = document.createElement("img")
            if (randomNumber(0,100) <= 5) {
                picture.src = "images/cookie2.png"
                picture.classList.add("cookie")
                td.appendChild(picture)
            }
            else if (randomNumber(0,100) <= 15) {
                picture.src = "images/milk2.png"
                picture.classList.add("milk")
                td.appendChild(picture)
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

document.addEventListener("click", (e) =>(
    console.log(e.target)
))

let currentRow = 0;
let currentCell = 0;

function addSanta(e){

    const tempTd = e.target;
    


    if (tempTd.closest(".milk") || tempTd.closest(".cookie")) {
        return;
    }
    const currentSanta = table.querySelector("img.santa");
    if (currentSanta) {
        return;
    }

    currentRow = Number(tempTd.parentNode.rowIndex)
    currentCell = Number(tempTd.cellIndex)
    

    const img = document.createElement("img");
    img.classList.add("santa");
    img.src = "images/santa.png"
    tempTd.appendChild(img);
}


document.addEventListener("keyup", (e) =>{
    if (e.key === "ArrowUp") {
        table.rows[currentRow].cells[currentCell].innerText = "";
        --currentRow;
        const img = document.createElement("img");
        img.classList.add("santa");
        img.src = "images/santa.png"
        table.rows[currentRow].cells[currentCell].appendChild(img);
    }
    if (e.key === "ArrowLeft") {
        table.rows[currentRow].cells[currentCell].innerText = "";
        --currentCell;
        const img = document.createElement("img");
        img.classList.add("santa");
        img.src = "images/santa.png"
        table.rows[currentRow].cells[currentCell].appendChild(img);
    }
    if (e.key === "ArrowRight") {
        table.rows[currentRow].cells[currentCell].innerText = "";
        ++currentCell;
        const img = document.createElement("img");
        img.classList.add("santa");
        img.src = "images/santa.png"
        table.rows[currentRow].cells[currentCell].appendChild(img);
    }
    if (e.key === "ArrowDown") {
        table.rows[currentRow].cells[currentCell].innerText = "";
        ++currentRow;
        const img = document.createElement("img");
        img.classList.add("santa");
        img.src = "images/santa.png"
        table.rows[currentRow].cells[currentCell].appendChild(img);
    }
})




table.addEventListener("click",addSanta)

playButton.addEventListener("click", generateTable)