const API = "http://127.0.0.1:5000";

async function getStatus() {

    const response = await fetch(`${API}/status`);
    const data = await response.json();

    document.getElementById("light").innerText =
        data.light ? "ON" : "OFF";

    document.getElementById("fan").innerText =
        data.fan + "%";

    document.getElementById("temp").innerText =
        data.temperature + "°C";
}

async function lightOn() {

    await fetch(`${API}/light`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state: true
        })
    });

    getStatus();
}

async function lightOff() {

    await fetch(`${API}/light`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state: false
        })
    });

    getStatus();
}

async function updateFan() {

    const value =
        document.getElementById("fanSlider").value;

    await fetch(`${API}/fan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            speed: parseInt(value)
        })
    });

    getStatus();
}

setInterval(getStatus, 1000);

getStatus();