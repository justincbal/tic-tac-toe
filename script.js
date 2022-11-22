const startBtn = document.querySelector('#startBtn');
const gameB = document.querySelector('.game-board');
const resetBtn = document.querySelector('#resett');
const form = document.querySelector('.form');
const message = document.querySelector('.message');




// Tile interaction
const tile = document.querySelectorAll('.tile');



// Game board object
const gameBoard = () =>{
    const board = [];
    const updateBoard = (text) => {board.push(text)
        for(i in board) {
            if (board[i] == undefined) {
                board.splice(i, 1);
            }
        }
    };
    return {board, updateBoard};
}

// Player object 
const player = (playerName, playerMark) => {
    const playerSpots = [];
    const updateSpot = (text) => playerSpots.push(text);
    const checkWin = () => {

        const wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for(i in wins) {
            if (wins[i].every(spots => playerSpots.includes(spots)) == true) { return true; }
        }

        return false;

    }


    return {updateSpot, playerMark, playerName, playerSpots, checkWin};
}

// Begin game
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.style.display = "none";
    gameB.style.display = "grid";
    beginGame();
})

function beginGame() {
    const p1 = document.querySelector('#p1').value;
    const p2 = document.querySelector('#p2').value;
    const game = gameBoard();
    let turn = false;
    let counter = 0;
    const player1 = player(p1, 'X');
    const player2 = player(p2, 'O');

    console.table(player2);

    tile.forEach((t) => {
        t.addEventListener('click', () => {
            game.updateBoard(+t.textContent);
            
            if (turn) {
                player2.updateSpot(+t.textContent);
                t.textContent = player2.playerMark;
                t.classList.add('yellow');
                turn = false;
            }
            else {
                player1.updateSpot(+t.textContent);
                t.textContent = player1.playerMark;
                t.classList.add('red');
                turn = true;
            }


            
            console.table(game.board.length);
            
            if (player1.checkWin()) {
                message.style.display = "block";

                message.textContent = `Congrats ${player1.playerName}, you have won! Reset not yet implemented, refresh page to play again`;
            }
            else if( player2.checkWin()) {
                message.style.display = "block";

                message.textContent = `Congrats ${player2.playerName}, you have won! Reset not yet implemented, refresh page to play again`;
            }
            else if(game.board.length == 9) {
                message.style.display = "block";
                message.textContent = `Aww you tied! Reset not yet implemented, refresh page to play again`;
            }

            
        }, {once: true})    // Once true removes event listener after click
    })

    tile.forEach((t) => {
        t.removeEventListener('click', () =>{

        })
    })
}



