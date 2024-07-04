document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusText = document.getElementById('status-text');
    const resetButton = document.getElementById('reset-button');
    const columns = 7;
    const rows = 6;
    let currentPlayer = 'red';
    let gameOver = false;
    let board = Array(rows).fill(null).map(() => Array(columns).fill(null));

    const createBoard = () => {
        gameBoard.innerHTML = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.column = c;
                cell.dataset.row = r;
                gameBoard.appendChild(cell);
            }
        }
    };

    const resetBoard = () => {
        board = Array(rows).fill(null).map(() => Array(columns).fill(null));
        currentPlayer = 'red';
        gameOver = false;
        statusText.textContent = `${capitalize(currentPlayer)}'s turn`;
        createBoard();
    };

    const checkWinner = () => {
        const directions = [
            [[0, 1], [0, 2], [0, 3]], 
            [[1, 0], [2, 0], [3, 0]], 
            [[1, 1], [2, 2], [3, 3]], 
            [[1, -1], [2, -2], [3, -3]] 
        ];

        const checkDirection = (row, col, direction) => {
            return direction.every(([dr, dc]) => {
                const r = row + dr;
                const c = col + dc;
                return r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer;
            });
        };

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] === currentPlayer && directions.some(direction => checkDirection(r, c, direction))) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleClick = (event) => {
        if (gameOver) return;
        const column = event.target.dataset.column;
        if (column !== undefined) {
            for (let r = rows - 1; r >= 0; r--) {
                if (!board[r][column]) {
                    board[r][column] = currentPlayer;
                    const cell = gameBoard.querySelector(`.cell[data-column="${column}"][data-row="${r}"]`);
                    cell.classList.add(currentPlayer);

                    if (checkWinner()) {
                        statusText.textContent = `${capitalize(currentPlayer)} wins!`;
                        gameOver = true;
                    } else {
                        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                        statusText.textContent = `${capitalize(currentPlayer)}'s turn`;
                    }
                    break;
                }
            }
        }
    };

    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    resetButton.addEventListener('click', resetBoard);
    gameBoard.addEventListener('click', handleClick);
    resetBoard();
});
