# 🏠 Assistant de Maison Intelligente

> Projet IoT & Intelligence Artificielle

## 📋 Présentation

Ce projet implémente un système de maison intelligente permettant de surveiller et contrôler des équipements à distance à travers une interface web interactive.

Le système combine :

* Un ESP32 simulé sur Wokwi
* Un capteur DHT22 pour la température
* Une LED simulant l’éclairage
* Un serveur Flask exposant une API REST
* Un dashboard web en temps réel
* Un assistant IA permettant d’interpréter des commandes en langage naturel

---

## 🏗️ Architecture du projet

```text
ESP32 (Wokwi)
    │
    ▼
Serveur Flask
    │
    ├── Dashboard Web
    │
    └── Assistant IA
```

Le capteur DHT22 envoie périodiquement les mesures de température au serveur Flask via HTTP.

Le serveur stocke l’état de la maison (température, lumière, ventilation) et le transmet au dashboard.

---

## 📂 Structure du projet

```text
smart-home-ai/

├── backend/
│   ├── server.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── esp32/
│   ├── smart_home.ino
│   └── diagram.json
│
└── README.md
```

---

## ⚙️ Fonctionnalités

### 🌡️ Surveillance de la température

* Lecture de la température avec un capteur DHT22
* Envoi automatique des données au serveur Flask
* Affichage en temps réel sur le dashboard

### 💡 Contrôle de l’éclairage

* Allumage et extinction de la lumière
* Synchronisation entre le dashboard et l’ESP32

### 🌬️ Gestion de la ventilation

* Contrôle de la vitesse du ventilateur
* Affichage de l’état actuel dans le dashboard

### 🤖 Assistant IA

L’utilisateur peut envoyer des commandes telles que :

* « Allume la lumière »
* « Éteins la lumière »
* « Augmente la ventilation »
* « Quelle est la température actuelle ? »

L’assistant analyse la commande et exécute l’action correspondante.

---

## 🔌 API REST

| Méthode | Route        | Description                        |
| ------- | ------------ | ---------------------------------- |
| GET     | /status      | Retourne l’état complet du système |
| GET     | /esp         | Retourne l’état destiné à l’ESP32  |
| POST    | /temperature | Mise à jour de la température      |
| POST    | /light       | Contrôle de la lumière             |
| POST    | /fan         | Contrôle de la ventilation         |

---

## 🛠️ Technologies utilisées

| Domaine         | Technologie           |
| --------------- | --------------------- |
| Microcontrôleur | ESP32 (Wokwi)         |
| Capteur         | DHT22                 |
| Backend         | Python Flask          |
| Frontend        | HTML, CSS, JavaScript |
| Communication   | HTTP REST             |
| Tunnel réseau   | ngrok                 |
| IA              | Ollama + Llama 3.2    |

---

## 🚀 Exécution

### Backend

```bash
cd backend
python server.py
```

### Tunnel ngrok

```bash
ngrok http --scheme=http 5000
```

### ESP32

Lancer la simulation sur Wokwi.

### Dashboard

Ouvrir :

```text
frontend/index.html
```

avec Live Server.

---

## 📹 Démonstration

La vidéo de démonstration présente :

1. Le dashboard web
2. La simulation ESP32 sur Wokwi
3. Les mesures de température en temps réel
4. Le contrôle de la lumière
5. Les commandes de l’assistant IA
6. La mise à jour automatique du système

---

## 👨‍🎓 Réalisé par
Fatima-Ez-Zahraa Skioui
Projet réalisé dans le cadre du module IoT & Intelligence Artificielle.
