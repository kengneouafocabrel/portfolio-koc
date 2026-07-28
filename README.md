# Portfolio de Kengne Ouafo Cabrel

Portfolio personnel statique (HTML/CSS/JS vanilla) avec un assistant IA propulsé par l'API Anthropic, protégé côté serveur via une fonction serverless Vercel.

## Structure du projet

```
mon-portfolio/
├── public/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── formuloo/               → 10 captures d'écran + demo.mp4 (optionnelle)
│       ├── memoire-cabrel.pdf      → mémoire de fin d'études (placeholder)
│       └── CV_Kengne_Ouafo_Cabrel.pdf → CV téléchargeable (placeholder)
├── api/
│   └── chat.js                     → fonction serverless qui appelle l'API Anthropic
├── package.json
├── .gitignore
└── README.md
```

L'image de prévisualisation (Open Graph / Twitter Card) réutilise directement
`public/assets/formuloo/bilan.png` — aucun fichier séparé n'est nécessaire pour le moment.

## Déployer sur Vercel en 5 étapes

1. **Créer une clé API Anthropic**
   Rendez-vous sur [console.anthropic.com](https://console.anthropic.com), créez (ou connectez-vous à) votre compte, puis générez une clé API. Copiez-la précieusement — elle ne sera plus affichée en entier par la suite.

2. **Pousser le projet sur GitHub**
   Depuis la racine du projet :
   ```bash
   git init
   git add .
   git commit -m "Portfolio initial"
   git branch -M main
   git remote add origin https://github.com/<votre-utilisateur>/<votre-repo>.git
   git push -u origin main
   ```

3. **Importer le repo sur Vercel**
   Sur [vercel.com](https://vercel.com), cliquez sur **Add New → Project**, puis sélectionnez le repository GitHub que vous venez de créer. Vercel détecte automatiquement le dossier `public/` (site statique) et le dossier `api/` (fonctions serverless) — aucune configuration de build n'est nécessaire.

4. **Ajouter la variable d'environnement**
   Dans les réglages du projet Vercel (**Settings → Environment Variables**), ajoutez :
   - Nom : `ANTHROPIC_API_KEY`
   - Valeur : la clé copiée à l'étape 1

   Ne mettez jamais cette clé directement dans le code source.

5. **Déployer**
   Cliquez sur **Deploy**. Une fois le déploiement terminé, votre portfolio est en ligne à l'URL fournie par Vercel, avec l'assistant IA fonctionnel (bulle de chat en bas à droite du site).

   Pensez ensuite à remplacer `https://votre-domaine.vercel.app/` par votre vraie URL Vercel dans `public/index.html` (balises Open Graph), `public/robots.txt` et `public/sitemap.xml`.

## Optimiser les captures d'écran (PNG → WebP)

Les captures de `assets/formuloo/` sont assez lourdes en PNG. Avant de déployer,
vous pouvez réduire leur poids sans effort :

1. Ouvrez [squoosh.app](https://squoosh.app) (en ligne, gratuit, aucune installation).
2. Glissez-déposez chaque PNG dans l'outil.
3. À droite, choisissez le format **WebP** et ajustez la qualité (souvent 75-85 % suffit, quasi indolore visuellement).
4. Téléchargez le fichier `.webp` et remplacez le PNG correspondant dans `public/assets/formuloo/`.
5. Mettez à jour les chemins `src="assets/formuloo/xxx.png"` en `.webp` dans `public/index.html`.

## Développement local

Pour tester l'assistant IA en local, installez la CLI Vercel puis lancez :

```bash
npm install -g vercel
vercel dev
```

Créez un fichier `.env` à la racine (déjà ignoré par Git) contenant :

```
ANTHROPIC_API_KEY=votre_cle_api
```
