import React from "react"
import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import * as Chess from 'chess.js'

import "../css/ChessComponent.css"

function ChessComponent(props) {
  const [game, setGame] = useState(new Chess())
  const [history, setHistory] = useState([])
  const [boardOrientation, setBoardOrientation] = useState("white")

  const safeGameMutate = (modify) => {
    setGame((g) => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  const onDrop = (sourceSquare, targetSquare) => {
    const curFen = game.fen()
    let move = null
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // Always promote to queen for now
      })
    })
    
    // If the move is invalid
    if (move === null)
      return false

    let newHistory = history.slice()
    newHistory.push(curFen)
    setHistory(newHistory)
    props.moveApplied()
    props.setFen(game.fen())
    return true
  }

  const onPopClick = (event) => {
    if (history.length === 0)
      return
    let hist = history.slice()
    const fen = hist.pop()
    game.load(fen)
    setHistory(hist)
    props.moveApplied()
    props.setFen(game.fen())
  }

  const flip = () => {
    if (boardOrientation === "white")
      setBoardOrientation("black")
    else
      setBoardOrientation("white")
  }

  if (props.bestMove !== "loading ...") {
    console.log(props.bestMove)
    console.log(props.bestMove.substring(0, 2))
    const piece = game.get(props.bestMove.substring(0, 2))["type"]
    props.setBestPiece(piece)
  }

  return (
    <div className="chessComponentContainer">
      <div className="chessComponentHeader">
        <button className="popButton" onClick={onPopClick}>{"Pop move"}</button>
        <button className="flipButton" onClick={flip}>{"Flip"}</button>
      </div>
      <div className="chessComponentBody">
        <Chessboard className="chessboard" position={game.fen()} onPieceDrop={onDrop} boardOrientation={boardOrientation}/>
      </div>
      <div className="fenDisplay">{game.fen()}</div>
      <div className="chessComponentFooter">
        <h2 className="turnIndicatorLabel">Turn:</h2>
        {(game.turn() === "w") ? <div className="turnIndicatorCircleW"></div> : <div className="turnIndicatorCircleB"></div>}
      </div>
    </div>
  )
}

export default ChessComponent