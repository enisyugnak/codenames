import React from 'react';
import BoardItem from './components/BoardItem';
import './style.css';
import { nanoid } from 'nanoid';

function App() {

  const boardSize = 25;
  const [tiles,setTiles] = React.useState(allNewItems())
  const colors = ["#E0B69F","#C1111E","#053360","#000000"];
  const [borderColor,setBorderColor] = React.useState({borderColor:colors[0]})
  let boardTiles =  Array.from(Array(boardSize).keys())

  React.useEffect(() => {
    dealCards();
  },[]);


  function dealCards(){

    setTiles(allNewItems()) // buil board with white tiles
    boardTiles.sort(() => Math.random() - 0.5)  // shuffle the array
 
    let blueTiles = boardTiles.slice(0, 9) // set random blues
    let redTiles = boardTiles.slice(9, 18) // set random reds
    let decideColor = Math.floor(Math.random()*2) // choose blue or red 
    let activeColor = decideColor ? colors[1] : colors[2] 
    // get the first item as assassin
    // and remove one element from the color
    let assassin = decideColor ? redTiles.slice(0, 1) : blueTiles.slice(0, 1);

    buildTiles(blueTiles,colors[1]);  // blue tiles
    buildTiles(redTiles,colors[2]); // red tiles
    buildTiles(assassin,colors[3]);  // assassin tile (black)
    
    setBorderColor({borderColor: activeColor});
  }

  function buildTiles(arr,col){
    setTiles(oldTiles=>oldTiles.map((item,index)=>{
      let piece = arr.indexOf(index);
      return  piece !=-1
      ? {...item,col : col } 
      : item
    }))
  }

  function allNewItems(){
    return Array.from({length:boardSize}).map(()=> generateNewItem())
  }

  /** returns  object with random number & color */

  function generateNewItem(col="#E0B69F"){

    return {
      id: nanoid(),
      col: col
    }
  }

  const elements = tiles.map(tile=>
    <BoardItem
      key = {tile.id}
      col = {tile.col}
    />
  )
  function renewBoard(){
    let result = window.confirm('The board will be changed');
    if(result){
      dealCards();
    }
  }

  return (
    <main>
      <div className = "board--frame" style={borderColor}>
        <div className="board--holder" onClick={renewBoard}> 
            {elements}
        </div>
      </div> 
    </main>



  );
}

export default App;
