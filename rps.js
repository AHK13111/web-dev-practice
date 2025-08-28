console.log("rps.js loaded");
// ...existing code...
let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const messageDisplay = document.getElementById("result-message");
const choicearr= ['rock', 'paper', 'scissors'];

const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3); 
    const computerChoice = choicearr[randomIndex];

  return computerChoice;
};

// const computerChoice = generateComputerChoice();

const winner = (userchoice, computerChoice) => {
    let resultMessage = "";
    let color = "";
    if (userchoice === computerChoice) {
        resultMessage = "It's a tie!";
        color = "yellow";
    } else if (
        (userchoice === "rock" && computerChoice === "scissors") ||
        (userchoice === "paper" && computerChoice === "rock") ||
        (userchoice === "scissors" && computerChoice === "paper")
    ) {
        resultMessage = "You win!";
        color = "lightgreen";
        userScore++;
    } else {
        resultMessage = "Computer wins!";
        color = "red";
        computerScore++;
    }
    messageDisplay.textContent = resultMessage;
    messageDisplay.style.color = color;
    // Call the functions to update the screen
    resultDisplay(resultMessage);
    updatescore();

    // This is for debugging purposes, to see the score change in the console
    console.log(`Scores => You: ${userScore}, Computer: ${computerScore}`);
};                              
//winner();

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        console.log("You chose:", userchoice);
        const computerChoice = generateComputerChoice();
        console.log("Computer chose:", computerChoice);
 // Call the winner function to determine the outcome and update the screen
        winner(userchoice, computerChoice);

    });
});

const updatescore=() => {
    // Update the scoreboard display
    const playerScoreElement = document.getElementById("player-score");
    const computerScoreElement = document.getElementById("computer-score");

    playerScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
};

const resultDisplay = (message) => {
    const resultElement = document.getElementById("result-message");
    resultElement.textContent = message;
}

// Add event listener to reset button
document.getElementById("reset-button").addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    updatescore();
    const resultElement = document.getElementById("result-message");
    resultElement.textContent = "Make your move!";
    resultElement.style.color = "white";

});