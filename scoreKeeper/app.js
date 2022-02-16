const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const resetBtn = document.querySelector("#reset");
const scoreGoal = document.querySelector("#scoreGoal");
const instText = document.querySelector(".instructionText");

let score1 = 0;
let score2 = 0;

btn1.addEventListener("click", () => {
    score1++;
    player1.innerText = score1;
    gameOver();
});

btn2.addEventListener("click", () => {
    score2++;
    player2.innerText = score2;
    gameOver();
});

resetBtn.addEventListener("click", () => {
    score1 = 0;
    score2 = 0;
    player1.innerText = 0;
    player2.innerText = 0;
    btn1.disabled = false;
    btn2.disabled = false;
    instText.innerText = "Use the buttons below to keep score."
});

function gameOver() {
    if (score1 >= scoreGoal.value || score2 >= scoreGoal.value) {
        btn1.disabled = true;
        btn2.disabled = true;

        if (score1 > score2) {
            instText.innerText = "Player 1 won!"
        } else {
            instText.innerText = "Player 2 won!"
        }
    }
}