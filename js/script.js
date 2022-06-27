const cellElements = document.querySelectorAll('[data-cell]');

const board = document.querySelector("[data-board]");
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartBtn = document.querySelector('[data-restart-btn]');
let isOTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const startGame = () => {
  isOTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove('o')
    cell.classList.remove('x')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true});
  }

  setBoardHoverClass()
  winningMessage.classList.remove('show-winning-message')
}

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageText.innerHTML = "Empate!"
  } else {
    winningMessageText.innerHTML = isOTurn ? "O Venceu!" : "x Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
}


const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer)
    })
  })
}

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('o')
  })
}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
  board.classList.remove('o')
  board.classList.remove('x')

  if (isOTurn) {
    board.classList.add('o')
  } else {
    board.classList.add('x')
  }
}

const swapTurns = () => {
  isOTurn = !isOTurn
  setBoardHoverClass()
}

const handleClick = (e) => {
  //colocar o sinal (x / o)
  const cell = e.target
  const classToAdd = isOTurn ? 'o' : 'x'

  placeMark(cell, classToAdd)

  // Verificar por vitória
  const isWin = checkForWin(classToAdd)
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false)
  } else if(isDraw) {
    endGame(true)
  } else {
    swapTurns()
  }

  // Verificar por empate
  // mudar o sinal
}



startGame()

restartBtn.addEventListener("click", startGame);