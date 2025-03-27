let qrCode;
const qrContainer = document.getElementById("qrContainer");
const downloadBtn = document.getElementById("downloadBtn");

// Generate QR Code
function generateQRCode() {
    const text = document.getElementById("textInput").value.trim();
    if (!text) {
        alert("Please enter some text to generate a QR code.");
        return;
    }

    // Clear previous QR Code
    qrContainer.innerHTML = "";

    // Create new QR Code
    qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: text,
        dotsOptions: { color: "#000", type: "rounded" },
        backgroundOptions: { color: "#fff" }
    });

    qrCode.append(qrContainer);

    // Show Download Button
    downloadBtn.style.display = "block";
}

// Download QR Code
function downloadQRCode() {
    if (!qrCode) return;
    qrCode.download({ name: "qr-code", extension: "png" });
}

// QR Code Scanner
const videoElement = document.getElementById("qrScanner");
const startScanBtn = document.getElementById("startScanBtn");
const scanBtn = document.getElementById("scanBtn");
const stopScanBtn = document.getElementById("stopScanBtn");
const scannedText = document.getElementById("scannedText");

let scanner = null;
let stream = null;

// Start Camera
async function startScanner() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        videoElement.srcObject = stream;
        scanBtn.disabled = false;
        stopScanBtn.disabled = false;

        // Initialize QR Scanner
        scanner = new QrScanner(videoElement, result => {
            scannedText.textContent = `Scanned QR Code: ${result}`;
            stopScanner();
        });
    } catch (error) {
        alert("Camera access denied or unavailable.");
        console.error(error);
    }
}

// Scan QR Code (Manual Scan Button)
function scanQRCode() {
    if (!scanner) {
        alert("Camera is not started!");
        return;
    }
    scanner.start();
}

// Stop Scanner
function stopScanner() {
    if (scanner) {
        scanner.stop();
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    videoElement.srcObject = null;
    scanBtn.disabled = true;
    stopScanBtn.disabled = true;
}
