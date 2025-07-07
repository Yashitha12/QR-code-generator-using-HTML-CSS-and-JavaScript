let qrCode = null;

function generateQR() {
  const textInput = document.getElementById("text-input");
  const container = document.getElementById("qrcode");
  const button = document.getElementById("generate-btn");
  const downloadSection = document.getElementById("download-section");
  const errorMessage = document.getElementById("error-message");

  const text = textInput.value.trim();

  // Clear previous errors
  textInput.classList.remove("error");
  errorMessage.style.display = "none";

  if (!text) {
    showError("Please enter some text first!");
    return;
  }

  // Show loading
  button.innerHTML = '<span class="loading"></span>Generating...';
  button.disabled = true;

  // Clear previous QR code
  container.innerHTML = "";
  downloadSection.style.display = "none";

  setTimeout(() => {
    try {
      qrCode = new QRCode(container, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
      });

      container.classList.add("fade-in");
      downloadSection.style.display = "block";
      textInput.classList.add("success");

      setTimeout(() => {
        textInput.classList.remove("success");
      }, 2000);
    } catch (error) {
      showError("Something went wrong. Please try again.");
    }

    button.innerHTML = "Generate QR Code";
    button.disabled = false;
  }, 500);
}

function showError(message) {
  const textInput = document.getElementById("text-input");
  const errorMessage = document.getElementById("error-message");

  textInput.classList.add("error");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";

  setTimeout(() => {
    textInput.classList.remove("error");
    errorMessage.style.display = "none";
  }, 3000);
}

function downloadQR() {
  const canvas = document.querySelector("#qrcode canvas");
  if (!canvas) {
    alert("No QR code to download!");
    return;
  }

  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = canvas.toDataURL();
  link.click();
}

// Enter key support
document
  .getElementById("text-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      generateQR();
    }
  });

// Clear QR when input is empty
document.getElementById("text-input").addEventListener("input", function (e) {
  if (!e.target.value.trim()) {
    document.getElementById("qrcode").innerHTML =
      '<div class="empty-state">Enter some text above and click generate!</div>';
    document.getElementById("download-section").style.display = "none";
  }
});
