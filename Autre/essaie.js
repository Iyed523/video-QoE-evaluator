
function openTab(evt, tabName) {

    // Masquer tous les contenus de tab
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Retirer la classe active de tous les boutons de tab
    tabLinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Afficher le contenu de l'onglet sélectionné
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer le formulaire
    const userForm = document.getElementById('userForm');

    // Vérifier si l'élément existe avant d'ajouter un gestionnaire d'événement
    if (userForm) {
        userForm.onsubmit = function (event) {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupérer le pseudo entré par l'utilisateur
            const pseudo_1 = document.getElementById('pseudo').value;
            console.log("Pseudo de l'utilisateur : " + pseudo_1);

            // Cacher la section du formulaire après soumission
            document.getElementById('feedback1').style.display = 'none';
        };
    } else {
        console.error("L'élément avec l'ID 'userForm' est introuvable.");
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');

    if (startButton) {
        startButton.onclick = function () {
            var pseudo = document.getElementById('pseudo').value.trim();

            // Vérifier si le pseudo est vide
            if (pseudo === "") {
                alert("Veuillez entrer votre pseudo avant de commencer.");
                return;
            }
            var minutes = parseInt(document.getElementById('temps').value); // Récupérer la valeur de l'élément <select>
            if (minutes >= 1 && minutes <= 5) {
                visionnerVideosAleatoires(minutes);
            } else {
                alert("Veuillez sélectionner un nombre de minutes valide.");
            }
            // Cacher la section du formulaire après soumission
            document.getElementById('tempsSection').style.display = 'none';
        };
    } else {
        console.error("L'élément avec l'ID 'startButton' est introuvable.");
    }
});




// Fonction principale pour faire visionner les vidéos dans deux résolutions
function visionnerVideosAleatoires(nombreDeSessions) {
    // Liste des vidéos avec les résolutions disponibles
    var videos = [
    
    
    
        {
            sources: { 144: "Video/image_fixe/cat1/_144.mp4", 240: "Video/image_fixe/cat1/_240.mp4", 360: "Video/image_fixe/cat1/_360.mp4",
                        480: "Video/image_fixe/cat1/_480.mp4",720: "Video/image_fixe/cat1/_720.mp4",1080: "Video/image_fixe/cat1/_1080.mp4"
                },
            resolutions: [144,240,360,480,720,1080],
        },

        {
            sources: { 240: "Video/image_fixe/cat2/_240.mp4", 360: "Video/image_fixe/cat2/_360.mp4",
                        480: "Video/image_fixe/cat2/_480.mp4",720: "Video/image_fixe/cat2/_720.mp4",1080: "Video/image_fixe/cat2/_1080.mp4"
            },
            resolutions: [240,360,480,720, 1080],
        },
        {
            sources: { 144: "Video/image_fixe/cat3/_144.mp4", 240: "Video/image_fixe/cat3/_240.mp4", 360: "Video/image_fixe/cat3/_360.mp4",
                        480: "Video/image_fixe/cat3/_480.mp4",720: "Video/image_fixe/cat3/_720.mp4",1080: "Video/image_fixe/cat3/_1080.mp4"
                },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/image_fixe/cat4/_144.mp4", 240: "Video/image_fixe/cat4/_240.mp4", 360: "Video/image_fixe/cat4/_360.mp4",
                        480: "Video/image_fixe/cat4/_480.mp4",720: "Video/image_fixe/cat4/_720.mp4",1080: "Video/image_fixe/cat4/_1080.mp4"
                },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/image_fixe/cat5/_144.mp4", 240: "Video/image_fixe/cat5/_240.mp4", 360: "Video/image_fixe/cat5/_360.mp4",
                        480: "Video/image_fixe/cat5/_480.mp4",720: "Video/image_fixe/cat5/_720.mp4",1080: "Video/image_fixe/cat5/_1080.mp4"
                },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 360: "Video/radio/cat1/_360.mp4",480: "Video/radio/cat1/_480.mp4",
                        720: "Video/radio/cat1/_720.mp4",1080: "Video/radio/cat1/_1080.mp4"
            },
            resolutions: [360,480,720, 1080],
        },
        {
            sources: { 720: "Video/radio/cat2/video720p.mp4", 1080: "Video/radio/cat2/video1080p.mp4", 2160: "Video/radio/cat2/video4k.mp4" },
            resolutions: [720, 1080, 2160],
        },
        {
            sources: { 360: "Video/radio/cat3/_360.mp4",480: "Video/radio/cat3/_480.mp4",
                        720: "Video/radio/cat3/_720.mp4",1080: "Video/radio/cat3/_1080.mp4"
            },
            resolutions: [360,480,720, 1080],
        },
        {
            sources: { 360: "Video/radio/cat4/_360.mp4",480: "Video/radio/cat4/_480.mp4",
                        720: "Video/radio/cat4/_720.mp4",1080: "Video/radio/cat4/_1080.mp4"
            },
            resolutions: [360,480,720, 1080],
        },
        {
            sources: { 144: "Video/radio/cat5/_144.mp4",240: "Video/radio/cat5/_240.mp4",360: "Video/radio/cat5/_360.mp4",
                        480: "Video/radio/cat5/_480.mp4", 720: "Video/radio/cat5/_720.mp4",1080: "Video/radio/cat5/_1080.mp4"
            },
            resolutions: [144,240,360,480,720, 1080],
        },
        {
            sources: { 240: "Video/foot/cat1/_240.mp4", 360: "Video/foot/cat1/_360.mp4",
                        480: "Video/foot/cat1/_480.mp4",720: "Video/foot/cat1/_720.mp4",1080: "Video/foot/cat1/_1080.mp4"
            },
            resolutions: [240,360,480,720, 1080],
        },
        {
            sources: { 360: "Video/foot/cat2/_360.mp4",480: "Video/foot/cat2/_480.mp4",
                        720: "Video/foot/cat2/_720.mp4",1080: "Video/foot/cat2/_1080.mp4"
            },
            resolutions: [360,480,720, 1080],
        },
        {
            sources: { 144: "Video/foot/cat3/_144.mp4",240: "Video/foot/cat3/_240.mp4", 360: "Video/foot/cat3/_360.mp4",
                        480: "Video/foot/cat3/_480.mp4",720: "Video/foot/cat3/_720.mp4",1080: "Video/foot/cat3/_1080.mp4"
            },
            resolutions: [144,240,360,480,720, 1080],
        },
        {
            sources: { 360: "Video/foot/cat4/_360.mp4",480: "Video/foot/cat4/_480.mp4",
                        720: "Video/foot/cat4/_720.mp4",1080: "Video/foot/cat4/_1080.mp4"
            },
            resolutions: [360,480,720, 1080],
        },
        {
            sources: { 360: "Video/foot/cat5/_360.mp4",480: "Video/foot/cat5/_480.mp4",
                        720: "Video/foot/cat5/_720.mp4",1080: "Video/foot/cat5/_1080.mp4"
            },
            resolutions: [360,480,720, 1080],
        },

        {
            sources: { 144: "Video/Soud_Minc/cat1/_144.mp4", 240: "Video/Soud_Minc/cat1/_240.mp4", 360: "Video/Soud_Minc/cat1/_360.mp4",
                        480: "Video/Soud_Minc/cat1/_480.mp4",720: "Video/Soud_Minc/cat1/_720.mp4",1080: "Video/Soud_Minc/cat1/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  360: "Video/Soud_Minc/cat2/_360.mp4",480: "Video/Soud_Minc/cat2/_480.mp4",
            720: "Video/Soud_Minc/cat2/_720.mp4",1080: "Video/Soud_Minc/cat2/_1080.mp4"
            },
            resolutions: [360,480,720,1080],
        },
        {
            sources: {  360: "Video/Soud_Minc/cat3/_360.mp4",480: "Video/Soud_Minc/cat3/_480.mp4",
            720: "Video/Soud_Minc/cat3/_720.mp4",1080: "Video/Soud_Minc/cat3/_1080.mp4"
            },
            resolutions: [360,480,720,1080],
        },
        {
            sources: {  360: "Video/Soud_Minc/cat4/_360.mp4",480: "Video/Soud_Minc/cat4/_480.mp4",
            720: "Video/Soud_Minc/cat4/_720.mp4",1080: "Video/Soud_Minc/cat4/_1080.mp4"
            },
            resolutions: [360,480,720,1080],
        },
        {
            sources: {  360: "Video/Soud_Minc/cat5/_360.mp4",480: "Video/Soud_Minc/cat5/_480.mp4",
            720: "Video/Soud_Minc/cat5/_720.mp4",1080: "Video/Soud_Minc/cat5/_1080.mp4"
            },
            resolutions: [360,480,720,1080],
        },
        {
            sources: { 144: "Video/film_pours/cat1/_144.mp4",240: "Video/film_pours/cat1/_240.mp4",360: "Video/film_pours/cat1/_360.mp4",
                        480: "Video/film_pours/cat1/_480.mp4", 720: "Video/film_pours/cat1/_720.mp4",1080: "Video/film_pours/cat1/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/film_pours/cat2/_144.mp4",240: "Video/film_pours/cat2/_240.mp4",360: "Video/film_pours/cat2/_360.mp4",
                        480: "Video/film_pours/cat2/_480.mp4", 720: "Video/film_pours/cat2/_720.mp4",1080: "Video/film_pours/cat2/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/film_pours/cat3/_144.mp4",240: "Video/film_pours/cat3/_240.mp4",360: "Video/film_pours/cat3/_360.mp4",
                        480: "Video/film_pours/cat3/_480.mp4", 720: "Video/film_pours/cat3/_720.mp4",1080: "Video/film_pours/cat3/_1080.mp4",
                        2160: "Video/film_pours/cat3/_2160.mp4"

            },
            resolutions: [144,240,360,480,720,1080,2160],
        },
        {
            sources: { 240: "Video/film_pours/cat4/_240.mp4",360: "Video/film_pours/cat4/_360.mp4",
                        480: "Video/film_pours/cat4/_480.mp4", 720: "Video/film_pours/cat4/_720.mp4",1080: "Video/film_pours/cat4/_1080.mp4"

            },
            resolutions: [240,360,480,720,1080],
        },
        {
            sources: { 240: "Video/film_pours/cat4/_240.mp4",360: "Video/film_pours/cat4/_360.mp4",
                        480: "Video/film_pours/cat4/_480.mp4", 720: "Video/film_pours/cat4/_720.mp4",1080: "Video/film_pours/cat4/_1080.mp4"

            },
            resolutions: [240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/film_pours/cat5/_144.mp4",240: "Video/film_pours/cat5/_240.mp4",360: "Video/film_pours/cat5/_360.mp4",
                        480: "Video/film_pours/cat5/_480.mp4", 720: "Video/film_pours/cat5/_720.mp4",1080: "Video/film_pours/cat5/_1080.mp4"

            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/horreur/cat1/_144.mp4", 240: "Video/horreur/cat1/_240.mp4", 360: "Video/horreur/cat1/_360.mp4",
                        480: "Video/horreur/cat1/_480.mp4",720: "Video/horreur/cat1/_720.mp4",1080: "Video/horreur/cat1/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/horreur/cat2/_144.mp4", 240: "Video/horreur/cat2/_240.mp4", 360: "Video/horreur/cat2/_360.mp4",
                        480: "Video/horreur/cat2/_480.mp4",720: "Video/horreur/cat2/_720.mp4",1080: "Video/horreur/cat2/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/horreur/cat3/_144.mp4", 240: "Video/horreur/cat3/_240.mp4", 360: "Video/horreur/cat3/_360.mp4",
                        480: "Video/horreur/cat3/_480.mp4",720: "Video/horreur/cat3/_720.mp4",1080: "Video/horreur/cat3/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/horreur/cat4/_144.mp4", 240: "Video/horreur/cat4/_240.mp4", 360: "Video/horreur/cat4/_360.mp4",
                        480: "Video/horreur/cat4/_480.mp4",720: "Video/horreur/cat4/_720.mp4",1080: "Video/horreur/cat4/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: { 144: "Video/horreur/cat5/_144.mp4", 240: "Video/horreur/cat5/_240.mp4", 360: "Video/horreur/cat5/_360.mp4",
                        480: "Video/horreur/cat5/_480.mp4",720: "Video/horreur/cat5/_720.mp4",1080: "Video/horreur/cat5/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  360: "Video/Batman/cat1/_360.mp4",480: "Video/Batman/cat1/_480.mp4",
            720: "Video/Batman/cat1/_720.mp4",1080: "Video/Batman/cat1/_1080.mp4"
            },
            resolutions: [360,480,720,1080],
        },
        {
            sources: {  144: "Video/Batman/cat2/_144.mp4",240: "Video/Batman/cat2/_240.mp4",360: "Video/Batman/cat2/_360.mp4",
                        480: "Video/Batman/cat2/_480.mp4",720: "Video/Batman/cat2/_720.mp4",1080: "Video/Batman/cat2/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Batman/cat3/_144.mp4",240: "Video/Batman/cat3/_240.mp4",360: "Video/Batman/cat3/_360.mp4",
                        480: "Video/Batman/cat3/_480.mp4",720: "Video/Batman/cat3/_720.mp4",1080: "Video/Batman/cat3/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Batman/cat4/_144.mp4",240: "Video/Batman/cat4/_240.mp4",360: "Video/Batman/cat4/_360.mp4",
                        480: "Video/Batman/cat4/_480.mp4",720: "Video/Batman/cat4/_720.mp4",1080: "Video/Batman/cat4/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Batman/cat5/_144.mp4",240: "Video/Batman/cat5/_240.mp4",360: "Video/Batman/cat5/_360.mp4",
                        480: "Video/Batman/cat5/_480.mp4",720: "Video/Batman/cat5/_720.mp4",1080: "Video/Batman/cat5/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Dessin80/cat1/_144.mp4",240: "Video/Dessin80/cat1/_240.mp4",360: "Video/Dessin80/cat1/_360.mp4",
                        480: "Video/Dessin80/cat1/_480.mp4",720: "Video/Dessin80/cat1/_720.mp4",1080: "Video/Dessin80/cat1/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Dessin80/cat2/_144.mp4",240: "Video/Dessin80/cat2/_240.mp4",360: "Video/Dessin80/cat2/_360.mp4",
                        480: "Video/Dessin80/cat2/_480.mp4",720: "Video/Dessin80/cat2/_720.mp4",1080: "Video/Dessin80/cat2/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Dessin80/cat3/_144.mp4",240: "Video/Dessin80/cat3/_240.mp4",360: "Video/Dessin80/cat3/_360.mp4",
                        480: "Video/Dessin80/cat3/_480.mp4",720: "Video/Dessin80/cat3/_720.mp4",1080: "Video/Dessin80/cat3/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Dessin80/cat4/_144.mp4",240: "Video/Dessin80/cat4/_240.mp4",360: "Video/Dessin80/cat4/_360.mp4",
                        480: "Video/Dessin80/cat4/_480.mp4",720: "Video/Dessin80/cat4/_720.mp4",1080: "Video/Dessin80/cat4/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
        {
            sources: {  144: "Video/Dessin80/cat5/_144.mp4",240: "Video/Dessin80/cat5/_240.mp4",360: "Video/Dessin80/cat5/_360.mp4",
                        480: "Video/Dessin80/cat5/_480.mp4",720: "Video/Dessin80/cat5/_720.mp4",1080: "Video/Dessin80/cat5/_1080.mp4"
            },
            resolutions: [144,240,360,480,720,1080],
        },
    ];

    const resolutionLabels = {
        144:"144p",
        240: "240p",
        360: "360p",
        480: "480p",
        720: "720p",
        1080: "1080p",
        2160: "4k"
    };

    var currentVideoIndex = 0;
    var videoPlayer = document.getElementById('videoPlayer');
    var videoSource = document.getElementById('videoSource');
    var resolutionLabel = document.getElementById('resolutionLabel');
    var feedbackSection = document.getElementById('feedback');
    var resolution1Input = document.getElementById('resolution1');
    var resolution2Input = document.getElementById('resolution2');
    var correctAnswersDiv = document.getElementById('correctAnswers');
    var realResolution1Text = document.getElementById('realResolution1');
    var realResolution2Text = document.getElementById('realResolution2');
    let videosVisionnees = 0;
    let sessionsCompletes = 0;
    pseudo_1 = document.getElementById('pseudo').value;







    let videosVisionnees_1 = []; // Tableau pour stocker les vidéos visionnées

    function tirerVideoAleatoire() {
        // Filtrer les vidéos non encore visionnées
        let videosNonVisionnees = videos.filter(video => !videosVisionnees_1.includes(video));

        if (videosNonVisionnees.length === 0) {
            alert("Toutes les vidéos ont été visionnées dans cette session !");
            return null; // Plus de vidéos disponibles
        }

        // Sélectionner une vidéo aléatoire parmi celles non visionnées
        let randomIndex = Math.floor(Math.random() * videosNonVisionnees.length);
        let videoChoisie = videosNonVisionnees[randomIndex];

        // Ajouter la vidéo choisie à la liste des vidéos visionnées
        videosVisionnees_1.push(videoChoisie);

        return videoChoisie;
    }

    // Fonction pour tirer une résolution aléatoire parmi celles disponibles pour une vidéo
    function tirerResolutionAleatoire(video) {
        let availableResolutions = video.resolutions;
        let randomIndex = Math.floor(Math.random() * availableResolutions.length);
        return availableResolutions[randomIndex];
    }

    // Variables pour suivre le nombre de résolutions visionnées
    let sessionCount = 0;
    // Fonction pour jouer une paire de résolutions pour une vidéo
    function jouerResolutionPaire() {
        let video = tirerVideoAleatoire(); // Sélectionner une vidéo aléatoire
        let resolution1 = tirerResolutionAleatoire(video);
        let resolution2 = tirerResolutionAleatoire(video);

        // S'assurer que les deux résolutions sont différentes
        while (resolution1 === resolution2 && video.resolutions.length > 1) {
            resolution2 = tirerResolutionAleatoire(video);
        }

        console.log(`Résolutions sélectionnées : ${resolution1} et ${resolution2}`);

        let resolutions = [resolution1, resolution2];
        let currentResolutionIndex = 0;

        function jouerProchaineResolution() {
            if (currentResolutionIndex < resolutions.length) {
                let resolution = resolutions[currentResolutionIndex];
                videoSource.src = video.sources[resolution];
                //resolutionLabel.innerText = resolutionLabels[resolution];
                console.log(`Lecture de la vidéo en résolution ${resolutionLabels[resolution]}`);
                videoPlayer.load();
                videoPlayer.play();

                currentResolutionIndex++;
            } else {
                sessionCount++;
                afficherFeedback(resolution1, resolution2);
            }
        }

        // Commencer avec la première résolution
        jouerProchaineResolution();

        // Passer à la prochaine résolution quand la vidéo actuelle se termine
        videoPlayer.onended = jouerProchaineResolution;
    }


    // Fonction pour révéler l'onglet Sensibilisation
    function revealSensibilisationTab() {
        const sensibilisationTab = document.getElementById("sensibilisation-tab");
        if (sensibilisationTab) {
            sensibilisationTab.classList.remove("hidden"); // Affiche l'onglet en supprimant la classe 'hidden'
        }
    }

    // Fonction pour afficher le feedback après les deux vidéos
    function afficherFeedback(resolution1, resolution2) {
        feedbackSection.style.display = 'block';
        document.getElementById('feedback5').style.display = 'block';

        feedbackSection.onsubmit = function (event) {
            event.preventDefault();
            // Récupérer les réponses de l'utilisateur
            const userResolution1 = resolution1Input.value;
            const userResolution2 = resolution2Input.value;

            // Comparer les réponses de l'utilisateur avec les résolutions réelles
            const isCorrect1 = userResolution1 === resolutionLabels[resolution1];
            const isCorrect2 = userResolution2 === resolutionLabels[resolution2];

            // Afficher le feedback
            realResolution1Text.innerText = `La première vidéo était en : ${resolutionLabels[resolution1]} (${isCorrect1 ? 'Correct' : 'Incorrect'})`;
            realResolution2Text.innerText = `La deuxième vidéo était en : ${resolutionLabels[resolution2]} (${isCorrect2 ? 'Correct' : 'Incorrect'})`;

            //QO2
            const userImageQuality1 = document.querySelector('input[name="imageQuality1"]:checked');
            const userImageQuality2 = document.querySelector('input[name="imageQuality2"]:checked');

            // Vérifier que l'utilisateur a répondu aux questions de qualité d'image
            if (!userImageQuality1 || !userImageQuality2) {
                alert("Veuillez répondre à la question sur la qualité de l'image pour les deux vidéos.");
                return;
            }

            // Extraire les valeurs sélectionnées pour la qualité de l'image
            const imageQuality1 = userImageQuality1.value;
            const imageQuality2 = userImageQuality2.value;


            //QO3
            const userPreference = document.querySelector('input[name="preferredResolution"]:checked');

            // Vérifier que l'utilisateur a répondu aux questions de qualité d'image
            if (!userPreference) {
                alert("Veuillez répondre à la question sur votre préférence de qualité.");
                return;
            }
            // Extraire les valeurs sélectionnées pour la qualité de l'image
            const preferenceUser = userPreference.value;

            //QO4
            const userImageFluidity1 = document.querySelector('input[name="fluidity1"]:checked');
            const userImageFluidity2 = document.querySelector('input[name="fluidity2"]:checked');

            // Vérifier que l'utilisateur a répondu aux questions de qualité d'image
            if (!userImageFluidity1 || !userImageFluidity2) {
                alert("Veuillez répondre à la question sur la fluidité de l'image pour les deux vidéos.");
                return;
            }

            // Extraire les valeurs sélectionnées pour la qualité de l'image
            const imageFluidity1 = userImageFluidity1.value;
            const imageFluidity2 = userImageFluidity2.value;

            
            //QO5
            const userCritere = document.querySelector('input[name="importantCriteria"]:checked');

            // Vérifier que l'utilisateur a répondu aux questions de qualité d'image
            if (!userCritere) {
                alert("Veuillez répondre à la question sur votre préférence de critère.");
                return;
            }
            // Extraire les valeurs sélectionnées pour la qualité de l'image
            const critereUser = userCritere.value;

            //commentaire
            const userComments = document.getElementById('commentaire').value;


            

            const data = { 
                user: pseudo_1,
                resolution1: resolutionLabels[resolution1],
                resolution2: resolutionLabels[resolution2],
                QO1 : `(${userResolution1}, ${userResolution2})`,
                QO2 : `(${imageQuality1}, ${imageQuality2})`,
                QO3 : preferenceUser,
                QO4 : `(${imageFluidity1}, ${imageFluidity2})`,
                QO5 : critereUser,
                comments : userComments,

            };

            // Envoyer la requête POST avec fetch
            fetch('http://localhost:3300/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Indique que le corps de la requête est en JSON
                },
                body: JSON.stringify(data)  // Convertir l'objet JavaScript en JSON
            })
            .then(response => response.json())  // Traiter la réponse du serveur
            
            

            // Modifier les styles en fonction des résultats
            realResolution1Text.style.color = isCorrect1 ? 'green' : 'red';
            realResolution2Text.style.color = isCorrect2 ? 'green' : 'red';

            // Afficher les bonnes réponses et le feedback
            correctAnswersDiv.style.display = 'block';

            // Passer à la session suivante après un délai
            setTimeout(() => {
                document.getElementById('feedbackForm').reset();
                correctAnswersDiv.style.display = 'none';
                feedbackSection.style.display = 'none';
                document.getElementById('feedback5').style.display = 'none';

                videosVisionnees++;
                if (videosVisionnees < nombreDeSessions) {
                    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                    jouerResolutionPaire();
                } else {
                    alert("Toutes les sessions sont terminées !");
                }
                // Révéler et diriger vers l'onglet "Sensibilisation"
                revealSensibilisationTab();                             
                //openTab(event, 'sensibilisation');
            }, 2000); // Délai de 2 secondes avant la prochaine session
        };
    }

    // Commencer avec la première vidéo
    jouerResolutionPaire();
}




















