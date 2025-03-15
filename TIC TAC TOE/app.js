let start = document.querySelector(".players");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let game = document.querySelector("main");
let msg = document.querySelector("#msg");
let startbuttton = document.querySelector("#start-player");
let player1Input = document.getElementById("player1");
let player2Input = document.getElementById("player2");

// Create elements to display player names
let playerNamesContainer = document.createElement("div");
playerNamesContainer.classList.add("player-names");
game.insertBefore(playerNamesContainer, resetBtn);

let player1Name = "";
let player2Name = "";

let turn0 = true;
const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8], 
    [1,4,7], [2,5,8], [2,4,6], 
    [3,4,5], [6,7,8]
];

const clearBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

const showWinner = (winnerSymbol) => {
    let winnerName = winnerSymbol === "X" ? player1Name : player2Name;
    msg.innerText = `${winnerName} Wins! 🎉`;
    msgcontainer.classList.remove("hide");
    game.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turn0 ? "X" : "O";
        turn0 = !turn0;
        box.disabled = true;
        checkWinner();
    });
});

const resetGame = () => {
    turn0 = true;
    clearBoxes();
    msgcontainer.classList.add("hide");
    game.classList.remove("hide");
};

const newgame = () => {
    msgcontainer.classList.add("hide");
    start.classList.remove("hide");
    playerNamesContainer.innerHTML = "";  // Clear displayed names
};

const startgame = () => {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    if (player1Name === "" || player2Name === "") {
        alert("Please enter both player names before starting!");
        return;
    }

    clearBoxes();
    game.classList.remove("hide");
    start.classList.add("hide");

    // Show player names above the game board
    playerNamesContainer.innerHTML = `<h2>${player1Name} (X) vs ${player2Name} (O)</h2>`;
};

startbuttton.addEventListener("click", startgame);
newGameBtn.addEventListener("click", newgame);
resetBtn.addEventListener("click", resetGame);
