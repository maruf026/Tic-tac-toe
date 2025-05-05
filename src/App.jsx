 import {useState} from 'react';
 
 function Square({value,onSquareClick}){
  
  // function clickhandle(){
  //   setValue('X')
  // }
    return (
      <button onClick={onSquareClick} className='h-12 w-12 border border-gray-400 m-1 text-lg '>{value}</button>
    );
}


function Board({xIsNext, squares, onPlay}){
  

  let winner= calculateWinner(squares);
  let status;
  if(winner){
    status=`Winner: ${winner}`
  }
  else{
    status='Next Player'+ (xIsNext? 'X' : 'O')
  }

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    let nextSquare= squares.slice()
    if(xIsNext){
      nextSquare[i]= 'X';
    }
    else{
      nextSquare[i]='O';
    }
     onPlay(nextSquare);
  }
    return (
        <>
        <div>{status}</div>
         <div className='flex'>
         <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
         <Square value={squares[1]} onSquareClick={()=> handleClick(1)}/>
         <Square value={squares[2]} onSquareClick={()=> handleClick(2)}/>
         
         </div>

         <div className='flex'>
         <Square value={squares[3]} onSquareClick={()=> handleClick(3)}/>
         <Square value={squares[4]} onSquareClick={()=> handleClick(4)}/>
         <Square value={squares[5]} onSquareClick={()=> handleClick(5)}/>
         
         </div>

         <div className='flex'>
         <Square value={squares[6]} onSquareClick={()=> handleClick(6)}/>
         <Square value={squares[7]} onSquareClick={()=> handleClick(7)}/>
         <Square value={squares[8]} onSquareClick={()=> handleClick(8)}/>
         
         </div>
        </>
    );
}


export default function Game(){
  const [history, sethistory] = useState([Array(9).fill(null)]);

  
  const [xIsNext, setXIsNext]= useState(true);
  let [currentMove, setCurrentMove]=useState(0);
  let currentSquare= history[currentMove]

  function handlePlay(nextSquare){
        setXIsNext(!xIsNext);
        const nextHistory= [...history.slice(0, currentMove+1), nextSquare]
        sethistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(move){
    setCurrentMove(move);
    setXIsNext(move% 2===0)
  }

  let moves= history.map((squares, move)=> {
    let describe;
    if(move>0){
      describe=`Go to the move # ${move}`
    }
    else{
      describe=`Go to start the Game`;
    }
    return(
      <li key={move}>
        <button onClick={()=> jumpTo(move)}>{describe}</button>
      </li>
    )
  })
    return (
        <div>
          <div><Board 
          xIsNext={xIsNext}
          squares={currentSquare}
          onPlay={handlePlay}
          ></Board></div>
          <div>
            <ol>{moves}</ol>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}