import React from "react"
import { useState } from "react"

import "../css/PanelComponent.css"

function InfoComponent(props) {
  const [showStockfishEvaluation, setShowStockfishEvaluation] = useState(false)
  const [showStockfishMove, setShowStockfishMove] = useState(false)
  const [showStockfishPiece, setShowStockfishPiece] = useState(true)

  const onShowStockfishEvaluationChange = (event) => {
    if (event.target.checked)
      setShowStockfishEvaluation(true)
    else
      setShowStockfishEvaluation(false)
  }

  const onShowStockfishMoveChange = (event) => {
    if (event.target.checked)
      setShowStockfishMove(true)
    else
      setShowStockfishMove(false)
  }

  const onShowStockfishPieceChange = (event) => {
    if (event.target.checked)
      setShowStockfishPiece(true)
    else
      setShowStockfishPiece(false)
  }

  return (
    <div className="panelContainer">

      <div className="stockfishInfoContainer">
        <h2 className="stockfishTitle">Stockfish</h2>
        <div className="stockfishInfo">
          <div className="stockfishInfoEntry">
            <div>Piece:</div>
            <div>{showStockfishPiece ? props.bestPiece : "-"}</div>
          </div>
          <div className="stockfishInfoEntry">
            <div>Evaluation:</div>
            <div>{showStockfishEvaluation ? props.evaluation : "-"}</div>
          </div>
          <div className="stockfishInfoEntry">
            <div>Move:</div>
            <div>{showStockfishMove ? props.bestMove : "-"}</div>
          </div>
        </div>
      </div>

      <div className="settingsContainer">
        <h2 className="settingsTitle">Settings</h2>
        <div className="settingsOptions">
          <div className="settingsOptionEntry">
            <div>Show piece</div>
            <input 
              type="checkbox" 
              onChange={onShowStockfishPieceChange} 
              defaultChecked={true}
              name="showStockfishPiece" 
              className="settingsCheckbox"
            />
          </div>
          <div className="settingsOptionEntry">
            <div>Show evaluation</div>
            <input 
              type="checkbox" 
              onChange={onShowStockfishEvaluationChange} 
              defaultChecked={false}
              name="showStockfishEvaluation" 
              className="settingsCheckbox"
            />
          </div>
          <div className="settingsOptionEntry">
            <div>Show move</div>
            <input 
              type="checkbox" 
              onChange={onShowStockfishMoveChange} 
              defaultChecked={false}
              name="showStockfishMove" 
              className="settingsCheckbox"
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default InfoComponent