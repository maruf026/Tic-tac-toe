

import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="h-16 w-16 sm:h-20 sm:w-20 border border-gray-300 bg-white text-2xl sm:text-3xl font-bold flex items-center justify-center shadow hover:bg-blue-100 active:bg-blue-200 transition"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : `Next Player: ${xIsNext ? "❌ X" : "⭕ O"}`;

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-2">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onSquareClick={() => handleClick(idx)} />
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : "Start Game";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="px-3 py-1 mt-1 rounded bg-blue-100 hover:bg-blue-200 text-sm text-gray-800 shadow"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center gap-8 p-4 bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-xl">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="p-4 bg-white rounded-2xl shadow-md max-w-xs w-full">
        <h2 className="text-lg font-bold mb-2 text-gray-700">History</h2>
        <ol className="list-none space-y-1">{moves}</ol>
      </div>
    </div>
  );
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
    [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
