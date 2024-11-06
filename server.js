const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 9999;

// Utiliser le dossier 'public' pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route principale qui renvoie le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



function getImagePaths() {
  const imagesDir = path.join(__dirname, 'Public/img');
  return fs.readdirSync(imagesDir)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/Public/img/${file}`);
}


app.get('/api/images', (req, res) => {
  const images = getImagePaths();
  res.json(images);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
