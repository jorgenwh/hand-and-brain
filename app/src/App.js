import React from "react"
import { useState, useEffect } from "react"
import './App.css'

import ChessComponent from "./components/ChessComponent"
import PanelComponent from "./components/PanelComponent"

const postQuery = "http://127.0.0.1:5000/post"
const getQuery = "http://127.0.0.1:5000/get"

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
  const [bestMove, setBestMove] = useState("loading ...")
  const [bestPiece, setBestPiece] = useState("loading ...")
  const [evaluation, setEvaluation] = useState("loading ...")

  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

  const moveApplied = () => {
    setBestMove("loading ...")
    setEvaluation("loading ...")
    setBestPiece("loading ...")
  }

  useEffect(() => {
    if (bestMove !== "loading ...")
      return

    const postSuccess = post(fen)
    postSuccess.then((postSuccess) => {
      const response = get()
      response.then((response) => {
        const m = response.bestMove
        const e = response.evaluation
        setBestMove(m)
        setEvaluation(e)
      })
    })
    
  }, [fen])

  return (
    <div className="container">
      <div className="left">
        <ChessComponent setFen={setFen} bestMove={bestMove} setBestPiece={setBestPiece} moveApplied={moveApplied}/>
      </div>
      <div className="right">
        <PanelComponent bestMove={bestMove} evaluation={evaluation} bestPiece={bestPiece}/> 
      </div>
    </div>
  )
}

export default App
