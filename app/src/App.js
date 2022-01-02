import React from "react"
import './App.css'

import ChessComponent from "./components/ChessComponent"
import PanelComponent from "./components/PanelComponent"

function App() {
  return (
    <div className="container">
      <div className="left">
        <ChessComponent/>
      </div>
      <div className="right">
        <PanelComponent/> 
      </div>
    </div>
  )
}

export default App
