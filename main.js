const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const dataFile = './data.json';


const app = express();
const port = 3300;


// Middleware
app.use(express.json());
app.use(cors());



// Servir les fichiers statiques du répertoire courant
app.use(express.static(path.join(__dirname)));

// Configurer un chemin spécifique pour le dossier des vidéos
app.use('/Video', express.static(path.join(__dirname, 'Video')));

let userScores = {};
let userTimes = {};

// Charger les données depuis le fichier JSON
if (fs.existsSync(dataFile)) {
    try {
        const rawData = fs.readFileSync(dataFile);
        const jsonData = JSON.parse(rawData);
        userScores = jsonData.scores || {};
        userTimes = jsonData.times || {};
        console.log("✅ Données chargées depuis data.json");
    } catch (error) {
        console.error("❌ Erreur lors du chargement des données JSON :", error);
    }
}

function saveDataToFile() {
    const data = {
        scores: userScores,
        times: userTimes
    };
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        console.log("💾 Données sauvegardées dans data.json");
    } catch (err) {
        console.error("❌ Erreur lors de la sauvegarde :", err);
    }
}

// Configuration du fichier CSV
const csvFilePath = './data.csv';
const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'user', title: 'user' },
        { id: 'resolution1', title: 'resolution1' },
        { id: 'resolution2', title: 'resolution2' },
        { id: 'QO1', title: 'QO1' },
        { id: 'QO2', title: 'QO2' },
        { id: 'QO3', title: 'QO3' },
        { id: 'QO4', title: 'QO4' },
        { id: 'QO5', title: 'QO5' },
        { id: 'comments', title: 'comments' },
        { id: 'screenType', title: 'screenType' }, // Ajout de screenType à l'en-tête
        { id: 'timestamp', title: 'timestamp' } // ⬅️ Ajout ici


    ],
    append: true  // Ajoute des données sans écraser le fichier existant
});

// Vérifier si le fichier CSV existe, sinon le créer avec les en-têtes
if (!fs.existsSync(csvFilePath)) {
    console.log("Création du fichier CSV avec les en-têtes...");
    csvWriter.writeRecords([]).then(() => {
        console.log('Fichier CSV initialisé avec succès');
    });
}

// Route POST pour ajouter un utilisateur
app.post('/addUser', async (req, res) => {
    const { user, resolution1, resolution2, QO1, QO2, QO3, QO4, QO5, comments, screenType, } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!user || !resolution1 || !resolution2 || !QO1 || !QO2 || !QO3 || !QO4) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être renseignés!' });
    }

    try {
        const timestamp = new Date().toISOString();  // Le timestamp généré ici

        // Préparer les données pour l'écriture dans le fichier CSV
        const record = {
            user,
            resolution1,
            resolution2,
            QO1,
            QO2,
            QO3,
            QO4,
            QO5: QO5 || '',  // Si le champ `QO5` est vide, mettre une chaîne vide
            comments: comments || '', // Si le champ `comments` est vide, mettre une chaîne vide
            screenType: screenType || '',  // Ajouter le type d'écran
            timestamp 




        };


        await csvWriter.writeRecords([record]); // Ajoute une ligne dans le fichier CSV
        console.log("Utilisateur ajouté :", user);
        console.log("Données reçues:", JSON.stringify(record, null, 2));
        res.json({ message: "Utilisateur ajouté avec succès!" });
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});


const csvParser = require('csv-parser');
app.get('/precision/:username', (req, res) => {
    const username = req.params.username.trim().toLowerCase();

    let totalReponsesUser = 0;
    let bonnesReponsesUser = 0;

    let totalReponsesTous = 0;
    let bonnesReponsesTous = 0;

    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
            const rowUsername = row._0?.trim().toLowerCase();
            const userQO1 = (row._3 || "").replace(/[()\n\r]/g, "").split(",");
            const userRes1 = userQO1[0]?.trim().toLowerCase();
            const userRes2 = userQO1[1]?.trim().toLowerCase();

            const correctRes1 = (row._1 || "").trim().toLowerCase();
            const correctRes2 = (row._2 || "").trim().toLowerCase();

            // Pour l'utilisateur courant
            if (rowUsername === username) {
                if (correctRes1 && userRes1) {
                    totalReponsesUser++;
                    if (userRes1 === correctRes1) bonnesReponsesUser++;
                }
                if (correctRes2 && userRes2) {
                    totalReponsesUser++;
                    if (userRes2 === correctRes2) bonnesReponsesUser++;
                }
            }

            // Pour la moyenne globale
            if (correctRes1 && userRes1) {
                totalReponsesTous++;
                if (userRes1 === correctRes1) bonnesReponsesTous++;
            }
            if (correctRes2 && userRes2) {
                totalReponsesTous++;
                if (userRes2 === correctRes2) bonnesReponsesTous++;
            }
        })
        .on('end', () => {
            const precisionUser = totalReponsesUser > 0 ? (bonnesReponsesUser / totalReponsesUser) * 100 : 0;
            const precisionMoyenne = totalReponsesTous > 0 ? (bonnesReponsesTous / totalReponsesTous) * 100 : 0;

            res.json({
                precision: Number(precisionUser.toFixed(2)),
                moyenne: Number(precisionMoyenne.toFixed(2))
            });
        });
});


app.get('/confusions/:username', (req, res) => {
    const username = req.params.username.trim().toLowerCase();
    const confusionMap = {};

    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
            const user = (row._0 || "").trim().toLowerCase(); // colonne du nom d’utilisateur

            if (user === username) {
                const real1 = (row._1 || "").trim();
                const real2 = (row._2 || "").trim();
                const userQO1 = (row._3 || "").replace(/[()\n\r]/g, "").split(",");
                const user1 = userQO1[0]?.trim();
                const user2 = userQO1[1]?.trim();

                const pairs = [
                    { real: real1, perceived: user1 },
                    { real: real2, perceived: user2 }
                ];

                for (const pair of pairs) {
                    if (pair.real && pair.perceived && pair.real !== pair.perceived) {
                        const key = `${pair.real} → ${pair.perceived}`;
                        confusionMap[key] = (confusionMap[key] || 0) + 1;
                    }
                }
            }
        })
        .on('end', () => {
            const data = Object.entries(confusionMap)
                .map(([pair, count]) => ({ pair, count }))
                .sort((a, b) => b.count - a.count);
            res.json(data);
        });
});


app.get('/satisfaction/:username', (req, res) => {
    const username = req.params.username.trim().toLowerCase();

    const satisfactionMap1 = {}; // Pour resolution1
    const satisfactionMap2 = {}; // Pour resolution2

    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
            const rowUser = (row._0 || "").trim().toLowerCase();
            if (rowUser !== username) return;

            const resolution1 = (row._1 || "").trim();
            const resolution2 = (row._2 || "").trim();
            const qo2 = (row._4 || "").replace(/[()\n\r]/g, "").split(",");
            const quality1 = qo2[0]?.trim();
            const quality2 = qo2[1]?.trim();

            if (resolution1 && quality1) {
                if (!satisfactionMap1[resolution1]) satisfactionMap1[resolution1] = {};
                satisfactionMap1[resolution1][quality1] = (satisfactionMap1[resolution1][quality1] || 0) + 1;
            }

            if (resolution2 && quality2) {
                if (!satisfactionMap2[resolution2]) satisfactionMap2[resolution2] = {};
                satisfactionMap2[resolution2][quality2] = (satisfactionMap2[resolution2][quality2] || 0) + 1;
            }
        })
        .on('end', () => {
            res.json({ video1: satisfactionMap1, video2: satisfactionMap2 });
        });
});







const cookieParser = require('cookie-parser');
app.use(cookieParser());

let lastPseudo = null;
let lastPseudoExpires = 0;

app.post('/registerPseudo', (req, res) => {
    const { pseudo } = req.body;
    if (!pseudo) return res.status(400).json({ message: "Pseudo manquant." });

    lastPseudo = pseudo;
    lastPseudoExpires = Date.now() + 10 * 60 * 1000; // 10 min

    // Envoyer dans un cookie aussi
    res.cookie('userPseudo', pseudo, { maxAge: 10 * 60 * 1000, httpOnly: true });
    console.log(`✅ Pseudo enregistré : ${pseudo}`);
    res.json({ message: "Pseudo enregistré pour 10 minutes." });
});

app.get('/getLatestPseudo', (req, res) => {
    const now = Date.now();
    if (lastPseudo && now < lastPseudoExpires) {
        return res.json({ pseudo: lastPseudo });
    }
    return res.json({ pseudo: null });
});

// Route pour supprimer les pseudos expirés du pseudoStore toutes les 5 minutes
setInterval(() => {
    const now = Date.now();
    if (lastPseudo && now > lastPseudoExpires) {
        console.log(`🧹 Expiration du pseudo : ${lastPseudo}`);
        lastPseudo = null;
        lastPseudoExpires = 0;
    }
}, 1 * 60 * 1000);



app.post('/saveScore', (req, res) => {
    const { pseudo, score } = req.body;
    if (!pseudo || typeof score !== 'number') {
        return res.status(400).json({ message: "Pseudo ou score invalide." });
    }

    // Sauvegarde du score côté serveur
    userScores[pseudo] = score;

    console.log(`💾 Score sauvegardé : ${pseudo} → ${score}`);
    saveDataToFile();
    res.json({ message: "Score sauvegardé." });
});


app.get('/getScore', (req, res) => {
    const pseudo = req.query.pseudo;
    if (!pseudo) return res.status(400).json({ message: "Pseudo requis." });

    const score = userScores[pseudo] || 0;
    res.json({ score });
});


app.post('/saveTime', (req, res) => {
    const { pseudo, time } = req.body;
    if (!pseudo || typeof time !== 'number') {
        return res.status(400).json({ message: "Pseudo ou temps invalide." });
    }

    userTimes[pseudo] = time;
    console.log(`⏱️ Temps sauvegardé : ${pseudo} → ${time} sec`);
    saveDataToFile();
    res.json({ message: "Temps sauvegardé." });
});
app.get('/getTime', (req, res) => {
    const pseudo = req.query.pseudo;
    if (!pseudo) return res.status(400).json({ message: "Pseudo requis." });

    const time = userTimes[pseudo] || 0;
    res.json({ time });
});


// Route de test simple pour vérifier que le serveur fonctionne
app.get('/test', (req, res) => {
    res.json({ message: "Le serveur fonctionne correctement!" });
});




// Démarrer le serveur sur toutes les interfaces réseau
app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log('Pour accéder depuis d\'autres appareils, utilisez:');
    
    // Tenter de trouver les adresses IP locales pour faciliter l'accès
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Ignorer les adresses de loopback et non-IPv4
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`http://${net.address}:${port}/site.html`);
            }
        }
    }
});