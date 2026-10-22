# Inventory Native

Application mobile de gestion de stock et d'inventaire, développée avec **React Native**, **Expo** et une **API Python**.

L'application permet de gérer des produits, de consulter leurs informations et d'organiser leur suivi à travers un calendrier.

## Fonctionnalités

- **Gestion des produits** : consulter la liste des produits disponibles.
- **Ajout de produits** : enregistrer de nouveaux articles dans l'inventaire.
- **Modification des produits** : mettre à jour les informations des articles existants.
- **Détails des produits** : accéder aux informations d'un produit.
- **Planning** : consulter un calendrier pour organiser le suivi des produits.
- **Gestion des événements** : accéder à un espace dédié aux événements et à leur validation.
- **Navigation mobile** : interface organisée en onglets avec React Navigation.

## Technologies utilisées

### Frontend
- React Native
- Expo SDK 51
- JavaScript
- React Navigation
- Expo Vector Icons

### Backend
- Python
- API REST (architecture à confirmer selon `Api/app.py`)

### Outils
- Visual Studio Code
- Android Studio
- Expo Go
- npm
- Git / GitHub

## Architecture du projet

```text
inventory_native/
│
├── Api/
│   ├── app.py
│   ├── requirements.txt
│   └── .gitignore
│
├── App/
│   ├── assets/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── AddItemScreen.js
│   │   ├── DetailItem.js
│   │   ├── EditItemScreen.js
│   │   ├── CalendarScreen.js
│   │   └── ValidateCalendar.js
│   │
│   ├── App.js
│   ├── ItemsContext.js
│   ├── app.json
│   ├── babel.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## Installation

### 1. Prérequis

Avant de démarrer, installer :

- Node.js et npm
- Python 3
- Android Studio ou Expo Go
- Git

### 2. Récupérer le projet

```bash
git clone <URL_DU_DEPOT>
cd inventory_native
```

### 3. Installer le frontend

```bash
cd App
npm install
```

Vérifier les dépendances Expo :

```bash
npx expo-doctor
```

Si nécessaire :

```bash
npx expo install --fix
```

### 4. Installer le backend Python

Dans un second terminal, depuis la racine du projet :

```bash
cd Api
python -m venv venv
```

Activer l'environnement virtuel sous Windows :

```powershell
.\venv\Scripts\Activate.ps1
```

Installer les dépendances :

```bash
python -m pip install -r requirements.txt
```

## Démarrage

### Démarrer l'API

Depuis `Api/` :

```bash
python app.py
```

La commande suppose que `app.py` contient un point d'entrée permettant de lancer le serveur.

### Démarrer l'application mobile

Depuis `App/` :

```bash
npx expo start -c
```

Pour accéder à l'application :

- **Android Studio** : démarrer un émulateur, puis appuyer sur `a` dans le terminal Expo.
- **Téléphone Android** : scanner le QR code avec une version compatible d'Expo Go.
- **Navigateur Web** : possible uniquement si les dépendances Web sont installées et configurées.

## Configuration de l'API

Pour permettre la communication entre React Native et le backend, utiliser une adresse accessible depuis l'appareil.

Exemple pour une API locale utilisant le port `5000` :

**Émulateur Android :**

```javascript
const API_URL = "http://10.0.2.2:5000";
```

**Téléphone physique :**

```javascript
const API_URL = "http://192.168.1.XX:5000";
```

Remplacer `192.168.1.XX` par l'adresse IP locale de l'ordinateur.

Le téléphone et l'ordinateur doivent être connectés au même réseau. Le serveur Python doit également autoriser les connexions depuis le réseau local.

## Navigation

L'application est organisée autour de trois onglets principaux :

| Onglet | Description |
|---|---|
| Produits | Consultation, ajout et modification des produits |
| Planning | Visualisation du calendrier |
| Évènements | Consultation et validation des événements |

La navigation est gérée avec React Navigation et les données partagées utilisent un contexte React (`ItemsContext`).

## 🔧 Maintenance et diagnostic

Vérifier la configuration Expo :

```bash
npx expo-doctor
```

Réinitialiser le cache de développement :

```bash
npx expo start -c
```

Vérifier les appareils Android disponibles :

```bash
adb devices
```

En cas de blocage de l'émulateur, effectuer un **Cold Boot** depuis Android Studio Device Manager.

## Améliorations envisagées

- Amélioration de l'interface utilisateur.
- Optimisation des performances.
- Renforcement de la gestion des erreurs.
- Mise à jour du SDK Expo.
- Renforcement de la sécurité des dépendances.
- Ajout de tests automatisés.
- Préparation d'une version Android distribuable.

Projet académque de développement mobile React Native et Python.
