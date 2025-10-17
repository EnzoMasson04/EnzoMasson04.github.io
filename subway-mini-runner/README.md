# Subway Mini Runner (Babylon.js)
Un runner 3D ultra-simplifié façon Subway Surfers : 3 voies, obstacles, saut, pièces.

## Lancer
1. `npm i`
2. `npm run dev`
3. Ouvre `http://localhost:5173` (utilise une fenêtre privée si besoin)

## Contrôles
- ←/→ : changer de voie
- Espace : sauter
- R : rejouer après un crash

## Notes techniques
- Pas de physique/collisions Babylon : intersections AABB maison (moins d'erreurs)
- Monde qui défile en Z ; obstacles & pièces avancent vers le joueur
- Imports modulaires `@babylonjs/core` en casse correcte pour Windows
- Pas d'assets externes, que des primitives → zéro problème de chargement