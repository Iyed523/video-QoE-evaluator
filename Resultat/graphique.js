

function afficherGraphiquePrecision(precision) {
    const canvas = document.getElementById('chartPrecision');
    if (!canvas) {
        console.error("Canvas #chartPrecision introuvable !");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Impossible d'obtenir le contexte 2D du canvas.");
        return;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Votre taux de précision'],
            datasets: [{
                label: 'Précision (%)',
                data: [precision],
                backgroundColor: '#42a5f5'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}


function afficherGraphiqueConfusions(confusions) {
    const canvas = document.getElementById('chartConfusions');
    if (!canvas) {
        console.error("Canvas #chartConfusions introuvable !");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Impossible d'obtenir le contexte 2D.");
        return;
    }

    const labels = confusions.map(item => item.pair);
    const data = confusions.map(item => item.count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Nombre de confusions',
                data,
                backgroundColor: 'rgba(100, 149, 237, 0.7)'
            }]
        },
        options: {
            indexAxis: 'y', // barres horizontales
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Paires de résolutions les plus confondues'
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}


function afficherSatisfactionParResolution(data, videoTitle, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resolutions = Object.keys(data);
    const qualities = new Set();
    resolutions.forEach(res => {
        Object.keys(data[res]).forEach(q => qualities.add(q));
    });

    const labels = Array.from(qualities);
    const datasets = labels.map((quality, i) => {
        return {
            label: quality,
            data: resolutions.map(res => data[res][quality] || 0),
            backgroundColor: `hsl(${i * 40}, 70%, 60%)`
        };
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: resolutions,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Satisfaction par Résolution (${videoTitle})`
                },
                legend: { position: 'top' }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
}
