import React from "react"
import { useState } from "react"

import "../css/PanelComponent.css"

function InfoComponent(props) {
  const [showEngineEvaluation, setShowEngineEvaluation] = useState(true)
  const [showEngineMove, setShowEngineMove] = useState(true)
  const [showEnginePiece, setShowEnginePiece] = useState(true)

  const onShowEngineEvaluationChange = (event) => {
    if (event.target.checked)
      setShowEngineEvaluation(true)
    else
      setShowEngineEvaluation(false)
  }

  const onShowEngineMoveChange = (event) => {
    if (event.target.checked)
      setShowEngineMove(true)
    else
      setShowEngineMove(false)
  }

  const onShowEnginePieceChange = (event) => {
    if (event.target.checked)
      setShowEnginePiece(true)
    else
      setShowEnginePiece(false)
  }

  return (
    <div className="panelContainer">

      <div className="engineInfoContainer">
        <h2 className="engineTitle">Engine</h2>
        <div className="engineInfo">
          <div className="engineInfoEntry">
            <div>Piece:</div>
            <div>{showEnginePiece ? props.bestPiece : "-"}</div>
          </div>
          <div className="engineInfoEntry">
            <div>Evaluation:</div>
            <div>{showEngineEvaluation ? props.evaluation : "-"}</div>
          </div>
          <div className="engineInfoEntry">
            <div>Move:</div>
            <div onClick={props.playBestMove}>{showEngineMove ? props.bestMove : "-"}</div>
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
              onChange={onShowEnginePieceChange} 
              defaultChecked={true}
              name="showEnginePiece" 
              className="settingsCheckbox"
            />
          </div>
          <div className="settingsOptionEntry">
            <div>Show evaluation</div>
            <input 
              type="checkbox" 
              onChange={onShowEngineEvaluationChange} 
              defaultChecked={true}
              name="showEngineEvaluation" 
              className="settingsCheckbox"
            />
          </div>
          <div className="settingsOptionEntry">
            <div>Show move</div>
            <input 
              type="checkbox" 
              onChange={onShowEngineMoveChange} 
              defaultChecked={true}
              name="showEngineMove" 
              className="settingsCheckbox"
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default InfoComponent