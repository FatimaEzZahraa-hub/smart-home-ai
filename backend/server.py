from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

light_state = False
fan_speed = 0
temperature = 25

@app.route("/status")
def status():
    return jsonify({
        "light": light_state,
        "fan": fan_speed,
        "temperature": temperature
    })

@app.route("/light", methods=["POST"])
def light():
    global light_state

    data = request.json
    light_state = data["state"]

    return jsonify({
        "success": True,
        "light": light_state
    })

@app.route("/fan", methods=["POST"])
def fan():
    global fan_speed

    data = request.json
    fan_speed = data["speed"]

    return jsonify({
        "success": True,
        "fan": fan_speed
    })

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/temperature", methods=["POST"])
def update_temperature():
    global temperature

    data = request.json
    temperature = data["temperature"]

    return jsonify({
        "success": True
    })   