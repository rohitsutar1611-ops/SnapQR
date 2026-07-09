console.log("SnapQR script loaded successfully.");

// ===============================
// Elements
// ===============================

const chooseBtn = document.getElementById("choose-btn");
const imageInput = document.getElementById("image-input");

const previewContainer = document.getElementById("preview-container");
const previewImage = document.getElementById("preview-image");
const removeBtn = document.getElementById("remove-btn");

const uploadForm = document.getElementById("upload-form");

const qrResult = document.getElementById("qr-result");
const qrImage = document.getElementById("qr-image");
const downloadBtn = document.getElementById("download-btn");

// ===============================
// Allowed File Types
// ===============================

const allowed = [
    "image/png",
    "image/jpeg",
    "image/webp"
];

// ===============================
// Choose Image
// ===============================

chooseBtn.addEventListener("click", () => {
    imageInput.click();
});

// ===============================
// Preview Image
// ===============================

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    // Validate Type
    if (!allowed.includes(file.type)) {
        alert("Only PNG, JPG and WEBP images are allowed.");
        imageInput.value = "";
        return;
    }

    // Validate Size
    if (file.size > 5 * 1024 * 1024) {
        alert("Maximum file size is 5 MB.");
        imageInput.value = "";
        return;
    }

    previewContainer.classList.remove("hidden");

    previewImage.src = URL.createObjectURL(file);

});

// ===============================
// Remove Image
// ===============================

removeBtn.addEventListener("click", () => {

    imageInput.value = "";

    previewImage.src = "";

    previewContainer.classList.add("hidden");

    qrResult.classList.add("hidden");

});

// ===============================
// Upload Image
// ===============================

uploadForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const file = imageInput.files[0];

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();

    formData.append("image", file);

    try {

        const response = await fetch("/upload", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            // Success Message
            alert(data.message);

            // Console Logs
            console.log("Image URL:", data.image_url);
            console.log("QR URL:", data.qr_url);
            console.log("Filename:", data.filename);

            // Show QR Section
            qrResult.classList.remove("hidden");

            // Show QR Image
            qrImage.src = data.qr_url;

            // Download Button
            downloadBtn.href = data.qr_url;

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong while uploading.");

    }

});