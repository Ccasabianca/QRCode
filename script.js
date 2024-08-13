const translations = {
    en: {
        title: "QR Code Generator",
        urlLabel: "Enter URL:",
        errorCorrectionLabel: "Error Correction Level:",
        generateButton: "Generate QR Code",
        downloadButton:"Download QR Code",
    },
    es: {
        title: "Generador de Código QR",
        urlLabel: "Ingrese URL:",
        errorCorrectionLabel: "Nivel de Corrección de Errores:",
        generateButton: "Generar Código QR",
        downloadButton:"Descargar Código QR",
    },
    fr: {
        title: "Générateur de QR Code",
        urlLabel: "Entrez l'URL:",
        errorCorrectionLabel: "Niveau de Correction d'Erreur:",
        generateButton: "Générer le QR Code",
        downloadButton:"Télécharger le QR Code",
    }
};

function changeLanguage() {
    const selectedLanguage = document.getElementById('language').value;
    localStorage.setItem('preferredLanguage', selectedLanguage);
    const texts = translations[selectedLanguage];

    document.getElementById('navTitle').textContent = texts.title;
    document.getElementById('urlLabel').textContent = texts.urlLabel;
    document.getElementById('errorCorrectionLabel').textContent = texts.errorCorrectionLabel;
    document.getElementById('generateButton').textContent = texts.generateButton;
    document.getElementById('downloadButton').textContent = texts.downloadButton;
}

function loadPreferredLanguage() {
    const storedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('language').value = storedLanguage;
    changeLanguage();
}

document.getElementById('qrForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const errorCorrection = document.getElementById('errorCorrection').value;

    document.getElementById('qrCode').innerHTML = '';

    const qrCode = new QRCode(document.getElementById('qrCode'), {
        text: url,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel[errorCorrection]
    });

    document.getElementById('downloadButton').style.display = 'block';
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const qrCodeElement = document.getElementById('qrCode').querySelector('canvas');

    if (qrCodeElement) {
        const dataUrl = qrCodeElement.toDataURL("image/png");
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'qr_code.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});

loadPreferredLanguage();