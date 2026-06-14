from flask import Flask, jsonify, request
from flask_cors import CORS
from ai_assistant import ask_llama

import json

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

@app.route("/temperature", methods=["POST"])
def update_temperature():
    global temperature

    data = request.json
    temperature = data["temperature"]

    return jsonify({
        "success": True
    })

@app.route("/esp")
def esp_status():
    return jsonify({
        "light": light_state,
        "fan": fan_speed
    })

@app.route("/ask", methods=["POST"])
def ask():

    global light_state
    global temperature

    data = request.json
    prompt = data["message"]

    ai_response = ask_llama(prompt)

    try:

        result = json.loads(ai_response)

        action = result.get("action")

        if action == "light_on":

            light_state = True

            return jsonify({
                "response": "La lumière a été allumée."
            })

        elif action == "light_off":

            light_state = False

            return jsonify({
                "response": "La lumière a été éteinte."
            })

        elif action == "temperature":

            return jsonify({
                "response": f"La température actuelle est {temperature} °C."
            })

        return jsonify({
            "response": "Aucune action exécutée."
        })

    except Exception as e:

        return jsonify({
            "response": str(e)
        })

@app.route("/predict")
def predict():

    global temperature

    predictions = []

    current = temperature

    for i in range(1, 13):

        predictions.append({
            "hour": f"+{i}h",
            "temperature": round(
                current + ((i % 4) - 1),
                1
            )
        })

    return jsonify(predictions)

if __name__ == "__main__":
    app.run(debug=True)