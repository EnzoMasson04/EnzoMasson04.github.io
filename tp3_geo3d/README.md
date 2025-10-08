# TP3 – Géolocalisation & 3D (Correction complète)

Ce package couvre **toutes les demandes** du TP :
- **Exercice 1 – Partie 1 (Three.js)** : Terre 3D texturée, conversion **lat/lon → (x,y,z)**, ta **géolocalisation**, marqueurs **pays** avec **drapeaux** (via `restcountries.com`).
- **Exercice 1 – Partie 2 (Interactions Leaflet ↔ 3D)** :
  - **Leaflet → 3D** : clic sur la carte → la Terre pivote pour centrer cet endroit face caméra.
  - **3D → Leaflet** : clic sur la Terre → la carte se **recentre** sur le point cliqué.
- **Exercice 2 (Babylon.js – AR géolocalisée)** : fond **caméra**, **boussole lissée**, **géolocalisation**, **POI** proches (exemples), étiquettes, compatible mobile.

> ⚠️ **Prérequis** : servir les fichiers via un **serveur local** (sinon images/vidéo/capteurs peuvent être bloqués).
> Exemple : `python3 -m http.server 8000` puis aller sur `http://localhost:8000`.

## Structure
```
tp3_geo3d_complete/
├─ app/                 # Ex.1 part1 & part2 : Three.js + Leaflet
│  ├─ index.html
│  └─ main.js
├─ babylon_ar/          # Ex.2 : Babylon.js AR géolocalisée
│  └─ index.html
└─ README.md
```

## Lancement
1. Ouvre un terminal dans le dossier **tp3_geo3d_complete**.
2. Lance un serveur local :
   ```bash
   python3 -m http.server 8000
   ```
3. Pour **Exercice 1** (globe + carte) : va sur `http://localhost:8000/app/`
4. Pour **Exercice 2** (AR) : va sur `http://localhost:8000/babylon_ar/`
   - Teste sur **smartphone Android** branché (USB) avec `chrome://inspect`
   - Si **iOS**, utilise le bouton “Activer capteurs iOS” (autorisation capteurs).

## Notes techniques
- **Textures** et **drapeaux** sont chargés depuis des URLs publiques (nécessite Internet).
  - Terre : texture depuis le repo officiel three.js.
  - Drapeaux + positions pays : API `https://restcountries.com/v3.1/all`.
- **Fallbacks** : si une texture échoue (CORS ou offline), le code bascule vers des **couleurs unies** pour que l’exécution **continue** et que les interactions restent **fonctionnelles**.
- **Maths** :
  - Conversion `lat/lon → (x,y,z)` sur sphère unitaire (rayon configurable).
  - Raycasting pour récupérer le point 3D cliqué et reconvertir en `lat/lon`.
  - Rotation du globe pour amener une `lat/lon` face caméra (cible `(0, 0, radius)`).
- **AR (Ex.2)** :
  - Fond vidéo via `getUserMedia()` (caméra arrière).
  - Boussole via `deviceorientationabsolute` + correction `screen.orientation.angle` + **lissage**.
  - Repère local **ENU** (Est, Nord, Up) autour de l’utilisateur pour placer des POI.
