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
