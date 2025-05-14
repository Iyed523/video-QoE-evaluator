const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4200;

// Middleware
app.use(express.json());  // Middleware pour analyser le JSON
app.use(cors());


// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "3Wa12s&oi@fal",
  database: "cava",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : ", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Route POST pour ajouter un utilisateur
app.post('/addUser', async (req, res) => {
    const { user, resolution1, resolution2, QO1,QO2,QO3,QO4,QO5,comments } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!user || !resolution1 || !resolution2  || !QO1 || !QO2 || !QO3 || !QO4 || !QO5 ) {
        return res.status(400).json({ message: 'Le pseudo et les résolutions sont requis!' });
    }

    try {
      const commentValue = comments || null;

      const query = "INSERT INTO donnee (user, resolution1, resolution2,QO1,QO2,QO3, QO4, QO5, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await db.execute(query, [user, resolution1, resolution2,QO1,QO2,QO3,QO4,QO5, commentValue]);
      console.log("Utilisateur inséré dans la base :", user);
      res.json({ message: "Utilisateur ajouté avec succès!" });
    } catch (err) {
        console.error("Erreur lors de l'insertion de l'utilisateur :", err);
        res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
    }
});

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {  // '0.0.0.0' pour écouter sur toutes les interfaces
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
