const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 9999;
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('/db.sqlite');

// Utiliser le dossier 'public' pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route principale qui renvoie le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



function getImagePaths() {
  const imagesDir = path.join(__dirname, 'Public/imgMob');
  return fs.readdirSync(imagesDir)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/imgMob/${file}`);
}


app.get('/api/images', (req, res) => {
  const images = getImagePaths();
  res.json(images);
  
});

// Routes pour les différents contenus de la page
app.get('/content/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/contact.html'));
});

app.get('/content/accueil', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/accueil.html'));
});

app.get('/content/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/portfolio.html'));
});

app.get('/portfolio', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/portfolio');

    // Lecture du contenu du dossier
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error('Erreur lors de la lecture du dossier :', err);
        return res.status(500).json({ error: 'Erreur lors de la lecture du dossier' });
      }
  
      // Création d'un tableau avec les informations des fichiers/dossiers
      const result = files.map(file => ({
        name: file.name,
      }));
  
      // Envoi de la réponse en JSON
      res.json(result);
    });
});

app.get('/portfolio/dossierimg/:el', (req,res) =>{

  const img = req.params.el
  const directoryPath = path.join(__dirname, `public/portfolio/${img}`);

  fs.readdir(directoryPath, (err, files) => {

    if(err){
      console.log('ça va pas');
    }else if(files === 0){
      console.log("y'a rien");
    }else{
      let chemin = `portfolio/${img}/${files[0]}`
      res.json({src:chemin})
    }

  });

})

app.get('/portfolio/img/:el', (req,res) =>{

  const img = req.params.el
  const directoryPath = path.join(__dirname, `public/portfolio/${img}`);

  fs.readdir(directoryPath, (err, files) => {

    if(err){
      console.log('ça va pas');
    }else if(files === 0){
      console.log("y'a rien");
    }else{
      
      res.json(files)
    }

  });

})


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
