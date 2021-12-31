import React from "react"
import { useState, useEffect } from "react"

import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

import './App.css';

function App() {
  const [game, setGame] = useState(new Chess())

  // function safeGameMutate(modify) {
  //   setGame((g) => {
  //     const update = { ...g }
  //     modify(update)
  //     return update
  //   })
  // }

  return (
    <div className="container">
      <Chessboard id="BasicBoard"/>
    </div>
  );
}

export default App;
