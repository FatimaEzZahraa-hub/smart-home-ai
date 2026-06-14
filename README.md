# 🏠 Smart Home AI

> Projet IoT intelligent réalisé avec **ESP32**, **Flask** et **Intelligence Artificielle** (Ollama + Llama 3.2)

---

## 📋 Description

Ce projet permet de surveiller et contrôler une maison intelligente à travers un dashboard web.

Le système utilise un capteur **DHT22** connecté à un **ESP32** pour mesurer la température. Les données sont envoyées à un serveur **Flask** puis affichées en temps réel sur une interface web.

Un assistant **IA basé sur Ollama et Llama 3.2** permet également de contrôler certains équipements via des commandes en langage naturel.

---

## 🚀 Fonctionnalités

- ✅ Lecture de la température via DHT22
- ✅ Communication ESP32 ↔ Flask
- ✅ Dashboard Web temps réel
- ✅ Affichage de la température actuelle
- ✅ Historique graphique des températures
- ✅ Contrôle d'une LED à distance
- ✅ Assistant IA avec Ollama (Llama 3.2)
- ✅ Commandes en langage naturel :
  - `Allume la lumière`
  - `Éteins la lumière`
  - `Quelle est la température ?`
- ✅ Prédiction graphique des températures

---

## 🛠️ Technologies utilisées

| Couche | Technologies |
|---|---|
| 🔧 **Hardware** | ESP32 · DHT22 · LED · Wokwi Simulator |
| ⚙️ **Backend** | Python · Flask · Flask-CORS |
| 🌐 **Frontend** | HTML · CSS · JavaScript · Chart.js |
| 🤖 **IA** | Ollama · Llama 3.2 |

---

## 📂 Structure du projet

```
smart-home-ai/
├── backend/
│   ├── server.py
│   ├── ai_assistant.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── esp32/
│   └── smart_home.ino
└── README.md
```

---

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/FatimaEzZahraa-hub/smart-home-ai.git
cd smart-home-ai
```

### 2. Installer les dépendances

```bash
pip install flask flask-cors requests ollama
```

### 3. Lancer Ollama

```bash
ollama run llama3.2
```

### 4. Démarrer le serveur Flask

```bash
python server.py
```

### 5. Ouvrir le dashboard

Ouvrir `frontend/index.html` avec **Live Server**.

---

## 📡 Architecture du système

```
┌─────────────────┐
│  ESP32 + DHT22  │
└────────┬────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│    Flask API    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Dashboard Web  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Assistant IA    │
│ (Ollama/Llama)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Contrôle équip. │
└─────────────────┘
```

---

## 🎥 Démonstration

La démonstration montre :

- 🌡️ Lecture de la température en temps réel
- 🔗 Communication ESP32 ↔ Flask
- 📈 Affichage graphique de l'historique et des prédictions
- 💡 Contrôle de la LED
- 🤖 Assistant IA avec Ollama
- 🔮 Prédiction des températures

---

## 👩‍💻 Réalisée par

**Fatima-Ez-Zahraa Skioui**

*Projet réalisé dans le cadre du module IoT & Intelligence Artificielle.*
> 📁 **Note :** Les fichiers du projet se trouvent sur la branche [`master`](../../tree/master).
> Pour y accéder, sélectionnez la branche `master` depuis le menu des branches en haut à gauche.
