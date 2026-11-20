
const Gameboard = (function () {
    const board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    function getBoard() {
        return board.slice();
    }

    function placeMark(index, marker) {
        if (!Number.isInteger(index) || index < 0 || index >= board.length) {
            return false;
        }

        if (board[index] !== null) {
            return false;
        }

        board[index] = marker;
        return true;
    }

    function resetBoard() {
        board.fill(null);
    }

    return {
        getBoard,
        placeMark,
        resetBoard
    };
})();


function createPlayer(name, marker) {
    return {
        name,
        marker
    };
}


const GameController = (function () {
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

    const players = [
        createPlayer("Player One", "X"),
        createPlayer("Player Two", "O")
    ];

    let activePlayer = players[0];
    let winner = null;
    let gameOver = false;

    function checkWinner() {
        const board = Gameboard.getBoard();

        for (const combination of winningCombinations) {
            const first = combination[0];
            const second = combination[1];
            const third = combination[2];

            if (
                board[first] !== null &&
                board[first] === board[second] &&
                board[first] === board[third]
            ) {
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        const board = Gameboard.getBoard();

        return board.every(square => square !== null);
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function getWinner() {
        return winner;
    }

    function isGameOver() {
        return gameOver;
    }

    function playRound(index) {
        if (gameOver) {
            return false;
        }

        const moveSuccessful = Gameboard.placeMark(
            index,
            activePlayer.marker
        );

        if (!moveSuccessful) {
            return false;
        }

        if (checkWinner()) {
            winner = activePlayer;
            gameOver = true;
            return true;
        }

        if (checkDraw()) {
            gameOver = true;
            return true;
        }

        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }

        return true;
    }

    return {
        playRound,
        getActivePlayer,
        getWinner,
        isGameOver
    };
})();
