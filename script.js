function Gameboard() {
  const cells = 9;
  const board = [];

  for (let i = 0; i < cells; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const drawMark = (cell, player) => {
    const selectedCell = board[cell];
    if (selectedCell.getValue() !== "") return;

    selectedCell.drawMark(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((cell) => cell.getValue());
    console.log(boardWithCellValues);
  };
  return { getBoard, drawMark, printBoard };
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

  const playRound = (cell) => {
    console.log(`${getActivePlayer().name} is marking into cell ${cell}`);
    board.drawMark(cell, getActivePlayer().mark);

    switchPlayer();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
