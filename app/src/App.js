import React from "react"
import { useState, useEffect } from "react"
import './App.css'

import { Chessboard } from "react-chessboard"
import * as Chess from 'chess.js'

import PanelComponent from "./components/PanelComponent"

const postQuery = "http://127.0.0.1:5000/post"
const getQuery = "http://127.0.0.1:5000/get"

const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const post = (fen) => {
  return fetch(postQuery, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"fen": fen})
  })
    .then((response) => response.json())
    .then((response) => { return response.success })
    .catch((err) => console.log(err))
}

const get = () => {
  return fetch(getQuery)
    .then((response) => response.json())
    .then((response) => {
      return response
    })
    .catch((err) => console.log(err))
}

function App() {
  const [game, setGame] = useState(new Chess())
  const [gameOver, setGameOver] = useState(false)
  const [boardOrientation, setBoardOrientation] = useState("white")

  const [bestMove, setBestMove] = useState("loading ...")
  const [bestPiece, setBestPiece] = useState("loading ...")
  const [evaluation, setEvaluation] = useState("loading ...")

  const [history, setHistory] = useState([startFen])

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
        promotion: bestMove[bestMove.length - 1]
      })
    })
    
    // If the move is invalid
    if (move === null)
      return false


    let newHistory = history.slice()
    newHistory.push(curFen)
    setHistory(newHistory)
    setBestPiece("loading ...")
    setEvaluation("loading ...")
    setBestMove("loading ...")
    setGameOver(game.game_over())
    return true
  }

  const reset = (event) => {
    setHistory([startFen])
    game.load(startFen)
    setBestPiece("loading ...")
    setEvaluation("loading ...")
    setBestMove("loading ...")
    setGameOver(false)
  }

  const onPopClick = (event) => {
    if (history.length < 2)
      return
    let hist = history.slice()
    const fen = hist.pop()
    game.load(fen)
    setHistory(hist)
  }

  const flip = () => {
    if (boardOrientation === "white")
      setBoardOrientation("black")
    else
      setBoardOrientation("white")
  }

  const getBestPiece = (move) => {
    const square = move.substring(0, 2)
    const piece = game.get(square)["type"]

    if (piece === "p")
      return "pawn"
    else if (piece === "n")
      return "knight"
    else if (piece === "b")
      return "bishop"
    else if (piece === "r")
      return "rook"
    else if (piece === "q")
      return "queen"
    else if (piece === "k")
      return "king"
    else
      console.log("Error: invalid piece type!")

    return piece
  }

  const onFenSubmit = (event) => {
    const element = document.getElementById("fenInputField")
    const fen = element.value
    element.value = ""
    const valid = game.load(fen)

    if (valid) 
      setHistory([startFen])
    else
      window.alert("Invalid fen input.")
  }

  const playBestMove = () => {
    onDrop(bestMove.substring(0, 2), bestMove.substring(2, 4))
  }

  useEffect(() => {
    if (gameOver) {
      setBestPiece("-")
      setBestMove("-")
      setEvaluation("-")
      return
    }

    const fen = game.fen()
    const postSuccess = post(fen)
    postSuccess.then((postSuccess) => {
      const response = get()
      response.then((response) => {
        const m = response.bestMove
        const e = response.evaluation
        console.log(e)
        if (game.fen() === fen) {
          setBestMove(m)
          if (e["type"] === "cp")
            setEvaluation(e["value"] / 100)
          else
            setEvaluation("#" + e["value"])
          setBestPiece(getBestPiece(m))
        }
      })
    })
  }, [history, game])

  return (
    <div className="container">
      <div className="left">
        <div className="leftHeader">
          <div className="headerButtons">
            <button className="resetButton" onClick={reset}>{"Reset"}</button>
            <button className="popButton" onClick={onPopClick}>{"Pop move"}</button>
            <button className="flipButton" onClick={flip}>{"Flip"}</button>
          </div>
          <div className="fenInputComponent">
            <input id="fenInputField" type="text" placeholder="Set position from fen ..." className="setFenInput"/>
            <button className="setFenButton" onClick={onFenSubmit}>{"Set"}</button>
          </div>
        </div>
        <div className="leftBody">
          <Chessboard className="chessboard" position={game.fen()} onPieceDrop={onDrop} boardOrientation={boardOrientation}/>
        </div>
        <div className="fenDisplay">{game.fen()}</div>
        <div className="leftFooter">
          <h2 className="turnIndicatorLabel">Turn:</h2>
          {(game.turn() === "w") ? <div className="turnIndicatorCircleW"></div> : <div className="turnIndicatorCircleB"></div>}
        </div>
      </div>
      <div className="right">
        <PanelComponent bestMove={bestMove} evaluation={evaluation} bestPiece={bestPiece} playBestMove={playBestMove}/> 
      </div>
    </div>
  )
}

export default App
