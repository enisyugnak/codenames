import React from "react";


export default function BoardItem(props){
    const styles = {
        backgroundColor: props.col
    }
    return(
        <div
        className="board--item" 
        style={styles} 
        >
          {props.col == "#000000" && <h1 className='cross'>X</h1>}
    </div>

    )
}

