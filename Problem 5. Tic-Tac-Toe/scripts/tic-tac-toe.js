// this holds the cells played by first player
var firstPlayerMoves = [];

// second player
var secondPlayerMoves = [];

// holds information who is playing currently
var isFirstPlayer = true;

// holds ifnormation if there is a winner
var hasWinner = false;

// function to sort Array
function sortArray(arrayToSort) {

    for (var a = 0; a < arrayToSort.length - 1; a++) {
        for (var b = a + 1; b < arrayToSort.length; b++) {
            if (arrayToSort[b] < arrayToSort[a]) {
                var temp = arrayToSort[b];
                arrayToSort[b] = arrayToSort[a];
                arrayToSort[a] = temp;
            }
        }
    }

}

// this colors cells if some of the players win
function colorCells(arrayOfResults) {

    for (var i = 0; i < arrayOfResults.length; i++) {

        var element = document.getElementById("cell-" + arrayOfResults[i]);

        if (isFirstPlayer) {

            var innerElement = element.getElementsByTagName("div")[0];
            innerElement.style.borderColor = "#0f0";

        }
        else {

            var innerElement = element.getElementsByTagName("div")[1];

            for (var c = 0; c < 2; c++) {

                var innerInnerElement = innerElement.getElementsByTagName("div")[c];

                innerInnerElement.style.backgroundColor = "#0f0";

            }

        }

    }

}

function validate(firstValue, secondValue, difference) {

    if (secondValue - firstValue == difference) {
        return true;
    }
    else {
        return false;
    }

}

// checks for winner
function checkArrays() {

    var currentArray = null;

    if (isFirstPlayer) {
        sortArray(firstPlayerMoves);
        currentArray = firstPlayerMoves;
    }
    else {
        sortArray(secondPlayerMoves);
        currentArray = secondPlayerMoves;
    }

    for (var a = 0; a < currentArray.length - 2; a++) {

        for (var b = a + 1; b < currentArray.length - 1; b++) {

            for (var c = b + 1; c < currentArray.length; c++) {

                var first = currentArray[a];
                var second = currentArray[b];
                var third = currentArray[c];

                if (first < 4) {
                    if (validate(first, second, 3) && validate(second, third, 3)) {
                        colorCells(new Array(first, second, third));
                        return true;
                    }
                }

                if (first == 1 || first == 4 || first == 7) {
                    if (validate(first, second, 1) && validate(second, third, 1)) {
                        colorCells(new Array(first, second, third));
                        return true;
                    }
                }

                if (first == 1) {
                    if (validate(first, second, 4) && validate(second, third, 4)) {
                        colorCells(new Array(first, second, third));
                        return true;
                    }
                }

                if (first == 3) {
                    if (validate(first, second, 2) && validate(second, third, 2)) {
                        colorCells(new Array(first, second, third));
                        return true;
                    }
                }

            }

        }

    }

    return false;

}

// this function validate if the cell is valid for playing
function canPlay(currentBlock) {

    // if this is true then the players already played 9 turns
    if (firstPlayerMoves.length + secondPlayerMoves.length >= 9) {
        return false;
    }
    else {

        var counter = 0;
        // this is for check if the the curren cell is already played
        for (counter = 0; counter < firstPlayerMoves.length; counter++) {

            if (currentBlock == firstPlayerMoves[counter]) {
                return false;
            }

        }

        for (counter = 0; counter < secondPlayerMoves.length; counter++) {
            if (currentBlock == secondPlayerMoves[counter]) {
                return false;
            }
        }

    }

    return true;
}

function checkForWinner() {

    if (isFirstPlayer) {

        if (firstPlayerMoves.length < 3) {
            return false;
        }
        else {
            return checkArrays();
        }

    }
    else {

        if (secondPlayerMoves.length < 3) {
            return false;
        }
        else {
            return checkArrays();
        }

    }

}

// this takes the number from the cell id - cell-1, cell-9
function splitElementName(element) {

    return element.substring(element.length - 1, element.length);

}

function play(element) {

    var player = document.getElementById(element);

    var indexOfPlayedCell = splitElementName(element);

    if (canPlay(indexOfPlayedCell) && !hasWinner) {

        if (isFirstPlayer) {
            playerOne = player.getElementsByClassName("player-1")[0];
            playerOne.style.display = "block";
            firstPlayerMoves[firstPlayerMoves.length] = indexOfPlayedCell;
        }
        else {
            var playerTwo = player.getElementsByClassName("player-2")[0];
            playerTwo.style.display = "block";
            secondPlayerMoves[secondPlayerMoves.length] = indexOfPlayedCell;
        }

        var hit = checkForWinner();

        if (hit) {
            hasWinner = true;
        }

        isFirstPlayer = !isFirstPlayer;
    }

}