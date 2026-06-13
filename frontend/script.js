const API = "http://127.0.0.1:5000";

// ── State ──
let deviceState = { light: false, fan: 0, temperature: null };

// ── Chart ──
const chartLabels = [];
const chartTemps  = [];

const tempChart = new Chart(document.getElementById("tempChart"), {
  type: "line",
  data: {
    labels: chartLabels,
    datasets: [{
      label: "Température °C",
      data: chartTemps,
      borderColor: "#ff6584",
      backgroundColor: "rgba(255,101,132,0.1)",
      borderWidth: 2,
      pointRadius: 3,
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#7986cb", font: { size: 10 } }, grid: { color: "rgba(108,99,255,0.1)" } },
      y: { ticks: { color: "#7986cb", font: { size: 10 } }, grid: { color: "rgba(108,99,255,0.1)" } }
    }
  }
});

// ── API calls ──

// GET /status  →  { light, fan, temperature }
async function fetchStatus() {
  try {
    const r = await fetch(`${API}/status`);
    if (!r.ok) { setOnline(false); return; }
    const d = await r.json();

    deviceState.light       = d.light;
    deviceState.fan         = d.fan;
    deviceState.temperature = d.temperature;

    updateMetrics();
    updateDeviceUI();
    setOnline(true);
    addLog(`temperature=${d.temperature}°C  light=${d.light}  fan=${d.fan}`);

    // ── Update chart ──
    chartLabels.push(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    chartTemps.push(d.temperature);
    if (chartLabels.length > 10) { chartLabels.shift(); chartTemps.shift(); }
    tempChart.update();
  } catch {
    setOnline(false);
    addLog("Impossible de joindre le serveur Flask.", "error");
  }
}

// POST /light  →  { state: true|false }
async function toggleLight() {
  deviceState.light = !deviceState.light;
  try {
    const r = await fetch(`${API}/light`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: deviceState.light })
    });
    const d = await r.json();
    if (d.success) {
      deviceState.light = d.light;
      updateDeviceUI();
      showToast(`Lumière ${deviceState.light ? "allumée 💡" : "éteinte"}`);
      addLog(`POST /light → light=${d.light}`);
    }
  } catch {
    addLog("Erreur lors du contrôle de la lumière.", "error");
    // revert optimistic update
    deviceState.light = !deviceState.light;
  }
  updateDeviceUI();
}

// POST /fan  →  { speed: 0|1|2|3 }
async function setFan(speed) {
  try {
    const r = await fetch(`${API}/fan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ speed })
    });
    const d = await r.json();
    if (d.success) {
      deviceState.fan = d.fan;
      updateDeviceUI();
      const labels = ["éteint", "faible ▸", "moyen ▸▸", "élevé ▸▸▸"];
      showToast(`Ventilateur : ${labels[speed]}`);
      addLog(`POST /fan → fan=${d.fan}`);
    }
  } catch {
    addLog("Erreur lors du contrôle du ventilateur.", "error");
  }
}

// ── UI helpers ──

function updateMetrics() {
  // Temperature
  const t = deviceState.temperature;
  document.getElementById("temp-val").textContent =
    t !== null && t !== undefined ? Number(t).toFixed(1) : "--.-";

  // Light badge
  const lightEl = document.getElementById("light-val");
  lightEl.textContent = deviceState.light ? "ON" : "OFF";
  lightEl.style.color = deviceState.light ? "var(--green)" : "var(--muted)";

  // Fan badge
  const fanLabels = ["OFF", "Faible", "Moyen", "Élevé"];
  const fanEl = document.getElementById("fan-val");
  fanEl.textContent = fanLabels[deviceState.fan] ?? "OFF";
  fanEl.style.color = deviceState.fan > 0 ? "var(--amber)" : "var(--muted)";
}

function updateDeviceUI() {
  // LED button
  const ledBtn = document.getElementById("btn-led");
  const ledLbl = document.getElementById("led-label");
  if (deviceState.light) {
    ledBtn.classList.add("active");
    ledLbl.textContent = "Lumière ON";
  } else {
    ledBtn.classList.remove("active");
    ledLbl.textContent = "Lumière OFF";
  }

  // State bar
  const stateLed = document.getElementById("state-led");
  stateLed.textContent = deviceState.light ? "ON" : "OFF";
  stateLed.style.color = deviceState.light ? "var(--green)" : "var(--muted)";

  // Fan buttons
  [0, 1, 2, 3].forEach(i => {
    document.getElementById(`fan-${i}`)
      .classList.toggle("active", deviceState.fan === i);
  });
  const fanLabels = ["OFF", "Faible", "Moyen", "Élevé"];
  const stateFan = document.getElementById("state-fan");
  stateFan.textContent = fanLabels[deviceState.fan] ?? "OFF";
  stateFan.style.color = deviceState.fan > 0 ? "var(--amber)" : "var(--muted)";
}

function setOnline(on) {
  document.getElementById("conn-dot").className   = `dot${on ? "" : " offline"}`;
  document.getElementById("conn-label").textContent = on ? "Connecté" : "Hors ligne";
}

// ── ESP32 log ──
function addLog(msg, type = "info") {
  const log  = document.getElementById("esp-log");
  const now  = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const line = document.createElement("div");
  line.className = "log-line";
  line.style.color = type === "error" ? "var(--accent2)" : "var(--green)";
  line.innerHTML = `<span>[${now}]</span> ${msg}`;
  log.appendChild(line);
  // Keep last 30 lines
  while (log.children.length > 30) log.removeChild(log.firstChild);
  log.scrollTop = log.scrollHeight;
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── Init ──
async function init() {
  await fetchStatus();
  // Auto-refresh every 10 s (mirrors ESP32 delay)
  setInterval(fetchStatus, 10000);
}

init();