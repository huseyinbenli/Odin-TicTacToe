function Gameboard() {
  const cells = 9;
  const board = [];

  for (let i = 0; i < cells; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const displayMark = (cell, player) => {
    const selectedCell = board[cell];
    if (selectedCell.getValue() !== "") return;

    selectedCell.drawMark(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((cell) => cell.getValue());
    console.log(boardWithCellValues);
  };

  const initBoard = (cell) => {
    const board = getBoard();
    board[cell] = "";
  };
  return { getBoard, displayMark, printBoard, initBoard };
}

function Cell() {
  let value = "";

  const drawMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    drawMark,
    getValue,
  };
}

function GameController(
  player1Name = "Player One",
  player2Name = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: player1Name,
      mark: "X",
    },
    {
      name: player2Name,
      mark: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const checkWinner = () => {
    const gameBoard = board.getBoard();
    const infoDiv = document.querySelector(".info-div");
    const boardDiv = document.querySelector(".board");

    let roundWon = false;
    // const init = Gameboard();

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let win of winConditions) {
      const [a, b, c] = win;

      if (gameBoard[a] === "" || gameBoard[b] === "" || gameBoard[c] === "") {
        continue;
      }
      if (
        gameBoard[a].getValue() &&
        gameBoard[a].getValue() == gameBoard[b].getValue() &&
        gameBoard[a].getValue() == gameBoard[c].getValue()
      ) {
        roundWon = true;
        infoDiv.textContent = `${getActivePlayer().name} wins.`;
        // return [a, b, c];
        // break;
      }
    }
    // init.initBoard();
    return roundWon;
  };

  const playRound = (cell) => {
    console.log(`${getActivePlayer().name} is marking into cell ${[cell]}`);
    board.displayMark(cell, getActivePlayer().mark);

    checkWinner();
    switchPlayer();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();

  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((cell, index) => {
      const cellBtn = document.createElement("button");
      cellBtn.classList.add("cell");

      cellBtn.dataset.cell = index;
      cellBtn.textContent = cell.getValue();
      boardDiv.appendChild(cellBtn);
    });
  };

  function clickHandler(e) {
    const selectedCell = e.target.dataset.cell;
    if (!selectedCell) return;
    game.playRound(selectedCell);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
}

ScreenController();
