const table = document.getElementById("table");
const playButton = document.getElementById("play");
const moves = document.getElementById("moves");
const score = document.getElementById("score");







function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateTable() {
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < 8; j++) {
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

function addSanta(e){
    const tempTd = e.target;
    if (tempTd.closest(".milk") || tempTd.closest(".cookie")) {
        return;
    }
    const currentSanta = table.querySelector("img.santa");
    if (currentSanta) {
        return;
    }

    const img = document.createElement("img");
    img.classList.add("santa");
    img.src = "images/santa.png"
    tempTd.appendChild(img);
}

table.addEventListener("click",addSanta)

playButton.addEventListener("click", generateTable)