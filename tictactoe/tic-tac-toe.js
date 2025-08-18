 // Get all the boxes and the reset button
        let boxes = document.querySelectorAll('.box');
        let resetBtn = document.querySelector('#reset');
        let msgContainer = document.querySelector('#message-container');

        // State variables for the game
        let turnO = true; // Player O's turn
        let count = 0; // To track how many moves have been made for draw detection

        // All possible winning combinations
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Function to reset the game state
        const resetGame = () => {
            turnO = true;
            count = 0;
            msgContainer.innerText = "";
            for (let box of boxes) {
                box.innerText = "";
                box.disabled = false;
                box.style.backgroundColor = "#fff";
            }
        };

        // Function to display the winner or a draw
        const showMessage = (message) => {
            msgContainer.innerText = message;
        };

        // Function to check for a winner or a draw
        const checkWinner = () => {
            // Check for a winning combination
            for (let pattern of winningCombinations) {
                let pos1Val = boxes[pattern[0]].innerText;
                let pos2Val = boxes[pattern[1]].innerText;
                let pos3Val = boxes[pattern[2]].innerText;

                // Check if the boxes are not empty before comparing
                if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                    if (pos1Val === pos2Val && pos2Val === pos3Val) {
                        showMessage(`Player ${pos1Val} wins!`);

                        boxes[pattern[0]].style.backgroundColor = 'lightgreen';
                        boxes[pattern[1]].style.backgroundColor = 'lightgreen';
                        boxes[pattern[2]].style.backgroundColor = 'lightgreen';

                        boxes[pattern[0]].style.color = 'white';
                        boxes[pattern[1]].style.color = 'white';
                        boxes[pattern[2]].style.color = 'white';


                        // Disable all boxes to end the game
                        for (let box of boxes) {
                            box.disabled = true;
                        }
                        return true;
                    }
                }
            }

            // Check for a draw
            if (count === 9) {
                showMessage("It's a draw!");
                return true;
            }

            return false;
        };

        // Add click event listeners to each box
        boxes.forEach((box) => {
            box.addEventListener('click', () => {
                if (!box.disabled) { // Check if the box is not already clicked
                    if (turnO) {
                        box.innerText = 'O';
                        box.style.color = '#e74c3c'; // Red
                        turnO = false;
                    } else {
                        box.innerText = 'X';
                        box.style.color = '#3498db'; // Blue
                        turnO = true;
                    }
                    box.disabled = true;
                    count++;
                    checkWinner();
                }
            });
        });

        // Add a click event listener to the reset button
        resetBtn.addEventListener('click', resetGame);