from flask import Flask, json, request, jsonify
from flask_cors import CORS
from stockfish import Stockfish

app = Flask(__name__)
CORS(app)

local_fen = None
local_stockfish = Stockfish("stockfish_14.1_win_x64_avx2.exe")

@app.route("/")
def landing():
  return "empty landing"

@app.route("/post", methods=["POST"])
def post():
  try:
    global local_fen

    data = request.get_json()
    fen = data["fen"]
    local_fen = fen
    print("new local fen:", local_fen)

    return jsonify({"success": True})
  except:
    return jsonify({"success": False})

@app.route("/get", methods=["GET"])
def get():
  try:
    global local_stockfish
    global local_fen

    local_stockfish.set_fen_position(local_fen)

    move = local_stockfish.get_best_move()
    evaluation = local_stockfish.get_evaluation()

    return jsonify({"success": True, "bestMove": move, "evaluation": evaluation})
  except:
    return jsonify({"success": False})

if __name__ == "__main__":
  app.run(debug=True)