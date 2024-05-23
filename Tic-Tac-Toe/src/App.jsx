import {useState} from 'react'


function Square ({value, onSquareClick}) {
  
  return <button className="square" onClick = {onSquareClick}> {value} </button>
}

 function Board({xIsNext, squares, onPlay}){ // it takes three props that Board can call with the updated squares arrays when a player makes a move

  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    //To prevent the letters from overwriting each other return early
    if (calculateWinner(squares) || squares[i]){
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);

    //This will enable the Game component to update the Board when the user clicks a square
    onPlay(nextSquares);
  }

  //Display Winner or Next Player
  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (<>
  <div className="status">{status}</div>
  <div className="board-row">
   <Square value = {squares[0]} onSquareClick = {() => handleClick(0)} />
   <Square value = {squares[1]} onSquareClick = {() => handleClick(1)} />
   <Square value = {squares[2]} onSquareClick = {() => handleClick(2)} />
  </div>
  <div className="board-row">
  <Square value = {squares[3]} onSquareClick = {() => handleClick(3)} />
  <Square value = {squares[4]} onSquareClick = {() => handleClick(4)} />
  <Square value = {squares[5]} onSquareClick = {() => handleClick(5)} />
  </div>  
  <div className="board-row">
  <Square value = {squares[6]} onSquareClick = {() => handleClick(6)} />
  <Square value = {squares[7]} onSquareClick = {() => handleClick(7)} />
  <Square value = {squares[8]} onSquareClick = {() => handleClick(8)} />
  </div>
   </>
    
  );
 
}


//This is the parent component. It displays a list of past moves

export default function Game(){
  //State to track which player is next and the history of moves
   const [xIsNext, setXIsNext] = useState(true);
  //const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //to keep track of which step the user is currently viewing
  const [currentMove, setCurrentMove] = useState(0);
  //To render the squares of the current move
  // const currentSquares = history[history.length - 1];
//To render the currently selected move, instead of always rendering the final move
const currentSquares = history[currentMove];


  //Function will be called by the Board component to update the game
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1);
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  //to display history of events
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return(
      <li key = {move}>
        <button onClick = {() => jumpTo(move)}>{description}</button>
      </li>
    );
  });



  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}




//To declare a winner
function calculateWinner(squares){
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

  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

