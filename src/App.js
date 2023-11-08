import * as React from 'react';
import './App.css'; // Import CSS file for styling

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState('X');

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = nextValue;
    setSquares(newSquares);
    setNextValue(calculateNextValue(newSquares));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)} data-value={squares[i]}>
        {squares[i]}
      </button>
    );
  }
  

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart-button" onClick={restart}>
        Restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="board" >
        <Board />
      </div>
      <div className="board">
        <Board />
      </div>
      <div className="board" >
        <Board />
      </div>
    </div>
  );
}


function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner : ${winner}`
    : squares.every(Boolean)
    ? `Scratch : Cat's game`
    : `Next Player : ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;