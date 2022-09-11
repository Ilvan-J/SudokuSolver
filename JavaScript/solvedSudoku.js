const element = document.getElementById("container");

const numbers = document.getElementById("numbers");

var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var row = null;
var column = null;

function creat_board() {
    for (let i = 0; i < 9; i++) {
        let row;
        if((i + 1) % 3 == 0 && i + 1 != 9) {
            row = "border-bottom";
        }
        for (let j = 0; j < 9; j++) {
            let col;
            if(j % 3 == 0 &&  j != 0) {
                col = "border-left";
            }
            element.innerHTML += `
            <div id="${i}_${j}" class="Row1Col1 ${col} ${row}" onclick="setBoard(${i}, ${j})">
            </div>
            `;
        }
    }
}

function creat_numbers() {
    for (let i = 1; i <= 9; i++) {
        numbers.innerHTML += `
            <div id="number_${i}" class="numberstyle" onclick="number_click(${i})">
            ${i}
        </div>
    `
    }
}

function setBoard(i, j) {
    row = i;
    column = j;
    document.getElementById(row + "_" + column);
}

function number_click(i) {
    
    if (row != null &&  column != null) {
        let text = "";
        
        let boardRowCol = document.getElementById(row + "_" + column);
        
        if(board[row][column] == i) {
            board[row][column] = 0;
            text = "";
            boardRowCol.classList.remove("Row1Col1-select");
            
        } else {
            board[row][column] = i;
            text = i;
           boardRowCol.classList.add("Row1Col1-select");
        }
        
        boardRowCol.innerText = text;

        row = null;
        column = null;
    }
    
}

function isNumberInRow(number, row) {
    for(let i = 0; i < 9; i++){
        if(board[row][i] == number) {
            return true;
        }
    }
    return false;
}

function isNumberInColumn(number, column) {
    for(let i = 0; i < 9; i++){
        if(board[i][column] == number) {
            return true;
        }
    }
    return false;
}

function isNumberInBox(number, row, column) {
    let localBoxRow = row - row % 3;
    let localBoxColumn = column - column % 3;
    
    for(let i = localBoxRow; i < localBoxRow + 3; i++){
        for(let j = localBoxColumn; j < localBoxColumn + 3; j++){
            if(board[i][j] == number) {
                return true;
            }
        }
    }
    
    return false;
}

function isValidPlacement(number, row, column) {
    return !isNumberInRow(number, row) && 
    !isNumberInColumn(number, column) && 
    !isNumberInBox(number, row, column)
    
}

function solverBoard() {
    for(let row = 0; row < 9; row++){
        for(let column = 0; column < 9; column++){
            if(board[row][column] == 0) {
                for(let numberToTry = 1; numberToTry <= 9; numberToTry++){
                    if(isValidPlacement(numberToTry, row, column)) {
                        board[row][column] = numberToTry;
                        if(solverBoard()) {
                            return true;
                        } else {
                            board[row][column] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solver() {
    if(solverBoard()) {
        alert("Resolvido");
        for (let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++){
                document.getElementById(i + "_" + j).innerHTML = board[i][j];
        }
    }
    } else {
        alert("Deu ruim;")
    }
}

creat_numbers();
creat_board();
