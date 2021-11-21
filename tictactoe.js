const X_CLASS="x";
const CIRCLE_CLASS="circle";
const WINNING_COMBINATIONS=[
    [0,1,2],[0,3,6],[1,4,7],[2,5,8],
    [2,4,6],[3,4,5],[6,7,8],[0,4,8]
];

const board=document.getElementById("#board");
const cellElements=document.querySelectorAll("[data-cell]");
const winningMessage=document.getElementById("winning-message");
const winningMessageTextElement=document.getElementById("[data-winning-message-text]");
const restartButton=document.getElementById("restartButton");

let circleTurn;
startGame();
restartButton.addEventListener("click",startGame);

function startGame()
{
    circleTurn = false; /*so first turn would be x*/
    cellElements.forEach((cell)=>{   /*callback fn which gives access to each cell ,ie,div*/
        cell.classList.remove(X_CLASS);  /*this helps to clear each cell after before starting a game*/
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click",handleClick); /*a function is called when a event is happening,ie click*/
        cell.addEventListener("click",handleClick,{once:true});  /*clicks once in a cell,*/

    });
    setBoardHoverClass();
    winningMessage.classList.remove("show")
}
function handleClick(e){    /*e-event,ie eventlistener*/
    const cell= e.target;  /*changes the value of the cell corresponding to the div im clicking*/
    const currentClass= circleTurn ? CIRCLE_CLASS:X_CLASS; /*if circle turn is true,click circle class or click x-class*/
    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
    endGame(false)
    }

    else if(isDraw()){
        endGame(true)
    }
    else{
    swapTurns();
    setBoardHoverClass();
    }
}

function swapTurns(){
    circleTurn=!circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }

}
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerHTML ="Draw"
    }else{
        winningMessageTextElement.innerHTML = `${circleTurn ? "o's" : "x's"}wins`
    }

    winningMessage.classList.add("show");
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);

}

function isDraw(){
    return[...cellElements].every((cell)=>{
return(cell.classList.contains(X_CLASS)|| cell.classList.contains(CIRCLE_CLASS));
    
    });
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some((combination)=>{  /*call back fn,which checks if anyone condition is met*/
        return combination.every((index)=>{     /*check if all coditn is met in the array*/
            return cellElements[index].classList.contains(currentClass);
        })
    })

}