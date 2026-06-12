# 🏠 Assistant de Maison Intelligente

> Projet de fin d'études – IoT + IA + Dashboard Web

## 📋 Vue d'ensemble

Un système domotique intelligent composé de :
- **ESP32** (simulé sur Wokwi) avec capteurs DHT22, LED et ventilateur
- **Backend Python Flask** exposant une API REST
- **IA conversationnelle** (Groq · llama3-8b) pour interpréter les commandes
- **Dashboard Web** HTML/CSS/JS avec graphes en temps réel
- **Prédiction IA** des températures sur 24h (modèle SVR)

---

## 🗂️ Structure du projet

```
smart-home/
├── backend/
│   ├── app.py              # Serveur Flask principal
│   ├── db.py               # Base de données SQLite
│   ├── ai_assistant.py     # IA conversationnelle (Groq)
│   ├── predictor.py        # Modèle SVR de prédiction
│   ├── simulate_esp32.py   # Script de simulation capteurs
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   └── index.html          # Dashboard complet (HTML/CSS/JS)
└── esp32/
    ├── smart_home.ino      # Code Arduino ESP32
    ├── diagram.json        # Schéma Wokwi
    └── libraries.txt       # Dépendances Wokwi
```

---

## 🚀 Installation & Lancement

### 1. Obtenir une clé API Groq (gratuite)

1. Aller sur [console.groq.com](https://console.groq.com/keys)
2. Créer un compte gratuit
3. Générer une clé API

### 2. Configurer le backend

```bash
cd backend

# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env et coller votre clé Groq
# GROQ_API_KEY=gsk_xxxxxxxxxxxx

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur
python app.py
```

Le backend démarre sur **http://localhost:5000**

### 3. Lancer la simulation ESP32

Dans un **second terminal** :
```bash
cd backend
python simulate_esp32.py
```

Cela envoie automatiquement des données de capteurs simulées au backend.

### 4. Ouvrir le dashboard

Ouvrir `frontend/index.html` dans un navigateur (double-clic ou Live Server).

### 5. (Optionnel) Simulation Wokwi

1. Aller sur [wokwi.com](https://wokwi.com)
2. Créer un nouveau projet ESP32
3. Copier le contenu de `esp32/smart_home.ino` dans l'éditeur
4. Copier `esp32/diagram.json` dans l'onglet Diagram
5. Modifier `BACKEND_URL` avec votre IP (ou tunnel ngrok)

---

## 🔌 API REST

| Méthode | Route        | Description                              |
|---------|-------------|------------------------------------------|
| GET     | `/`         | Statut du serveur                        |
| POST    | `/data`     | Recevoir données capteurs (ESP32)        |
| POST    | `/command`  | Envoyer une commande texte à l'IA        |
| GET     | `/latest`   | Dernière lecture capteurs                |
| GET     | `/history`  | Historique des lectures                  |
| GET     | `/state`    | État actuel des appareils               |
| POST    | `/control`  | Contrôle direct LED/ventilateur         |
| GET     | `/predict`  | Prédiction températures 24h (SVR)       |
| POST    | `/simulate` | Simuler une lecture (tests)             |

### Exemple : envoyer une commande

```bash
curl -X POST http://localhost:5000/command \
  -H "Content-Type: application/json" \
  -d '{"text": "Allume la lumière"}'
```

Réponse :
```json
{
  "action": "led_on",
  "response": "Lumière allumée !",
  "device_state": { "led": true, "fan_speed": 0 }
}
```

---

## 🤖 Fonctionnement de l'IA

1. L'utilisateur tape une commande dans le dashboard
2. Le backend envoie la commande à **Groq (llama3-8b-8192)**
3. L'IA retourne un JSON `{"action": "...", "response": "..."}`
4. Le backend applique l'action et répond au dashboard
5. Le dashboard met à jour l'interface en temps réel

---

## 📊 Prédiction des températures

Le module `predictor.py` utilise un modèle **SVR (Support Vector Regression)** :
- Entraîné sur l'historique disponible
- Prédit les températures des **24 prochaines heures**
- Se met à jour toutes les 5 minutes dans le dashboard

---

## 🛠️ Technologies utilisées

| Composant       | Technologie                  |
|----------------|------------------------------|
| Microcontrôleur | ESP32 (Wokwi)               |
| Capteurs        | DHT22 (température/humidité)|
| Backend         | Python · Flask              |
| Base de données | SQLite                      |
| IA              | Groq API · llama3-8b        |
| ML Prédiction   | scikit-learn · SVR          |
| Frontend        | HTML · CSS · JS · Chart.js  |

---

## 📹 Démo vidéo

Pour la vidéo de démonstration (30s–2min), montrer :
1. Le dashboard ouvert dans le navigateur
2. La simulation ESP32 en cours (`simulate_esp32.py`)
3. Les données en temps réel sur les graphes
4. Une commande texte à l'IA ("Allume la lumière")
5. La mise à jour des contrôles rapides
6. La courbe de prédiction 24h

---

## 👤 Auteur

Projet réalisé dans le cadre du cours IoT & Intelligence Artificielle.
