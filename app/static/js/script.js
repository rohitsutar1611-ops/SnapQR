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
const uploadBtn = document.getElementById("upload-btn");
const loading = document.getElementById("loading");
const dropZone = document.getElementById("drop-zone");
const copyUrlBtn = document.getElementById("copy-url-btn");
const openImageBtn = document.getElementById("open-image-btn");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
const fileName = document.getElementById("file-name");
const uploadTime = document.getElementById("upload-time");
const newQrBtn = document.getElementById("new-qr-btn");

// ===============================
// Allowed File Types
// ===============================

const allowed = [
    "image/png",
    "image/jpeg",
    "image/webp"
];

function showPreview(file) {

    previewContainer.classList.remove("hidden");

    previewImage.src = URL.createObjectURL(file);

}
function highlightDropZone() {

    dropZone.classList.remove("border-blue-300");

    dropZone.classList.add("border-blue-600", "bg-blue-50");

}

function unhighlightDropZone() {

    dropZone.classList.remove("border-blue-600", "bg-blue-50");

    dropZone.classList.add("border-blue-300");

}
dropZone.addEventListener("dragenter", (e) => {

    e.preventDefault();

    highlightDropZone();

});

dropZone.addEventListener("dragover", (e) => {

    e.preventDefault();

    highlightDropZone();

});

dropZone.addEventListener("dragleave", () => {

    unhighlightDropZone();

});

dropZone.addEventListener("drop", (e) => {

    e.preventDefault();

    unhighlightDropZone();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    // Validate Type
    if (!allowed.includes(file.type)) {
        showToast("Only PNG, JPG and WEBP images are allowed.");
        return;
    }

    // Validate Size
    if (file.size > 5 * 1024 * 1024) {
        showToast("Maximum file size is 5 MB.");
        return;
    }

    // Put dropped file into the input element
    const dt = new DataTransfer();
    dt.items.add(file);
    imageInput.files = dt.files;

    // Show Preview
    showPreview(file);

});
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
        showToast("Only PNG, JPG and WEBP images are allowed.");
        imageInput.value = "";
        return;
    }

    // Validate Size
    if (file.size > 5 * 1024 * 1024) {
        showToast("Maximum file size is 5 MB.");
        imageInput.value = "";
        return;
    }

    showPreview(file);

});

// ===============================
// Remove Image
// ===============================

removeBtn.addEventListener("click", () => {

    imageInput.value = "";

    previewImage.src = "";

    previewContainer.classList.add("hidden");

    qrResult.classList.add("hidden");
    qrResult.classList.add("opacity-0");
    qrResult.classList.add("translate-y-10");

});

// ===============================
// Upload Image
// ===============================

uploadForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const file = imageInput.files[0];

    if (!file) {
        showToast("Please select an image first.");
        return;
    }

    const formData = new FormData();

    formData.append("image", file);

    // Disable Upload Button
    uploadBtn.disabled = true;

    // Button Style
    uploadBtn.classList.add("opacity-60", "cursor-not-allowed");

    // Change Button Text
    uploadBtn.innerText = "Uploading...";

    // Show Loading
    loading.classList.remove("hidden");

    try {

        const response = await fetch("/upload", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            // Success Message
            showToast(data.message);

            // Console Logs
            console.log("Image URL:", data.image_url);
            console.log("QR URL:", data.qr_url);
            console.log("Filename:", data.filename);
            fileName.innerText = data.filename;

            uploadTime.innerText =
                new Date().toLocaleString();
            // Open Image Button
            openImageBtn.href = data.image_url;

            // Show QR Section
            qrResult.classList.remove("hidden");

            // Scroll to QR Result
            qrResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Show QR Image
            qrImage.src = data.qr_url;

            // Download Button
            downloadBtn.href = data.qr_url;

            setTimeout(() => {

                qrResult.classList.remove("opacity-0");
                qrResult.classList.remove("translate-y-10");


            }, 100);

            

            // Reset Upload Button
            uploadBtn.disabled = false;
            // Remove Disabled Style
            uploadBtn.classList.remove("opacity-60", "cursor-not-allowed");
            uploadBtn.innerText = "Upload";

            // Hide Loading
            loading.classList.add("hidden");

        }

        else {

            uploadBtn.disabled = false;
            // Remove Disabled Style
            uploadBtn.classList.remove("opacity-60", "cursor-not-allowed");
            uploadBtn.innerText = "Upload";

            loading.classList.add("hidden");

            showToast(data.message);

        }

    }

    catch (error) {

        console.error(error);

        uploadBtn.disabled = false;
        // Remove Disabled Style
        uploadBtn.classList.remove("opacity-60", "cursor-not-allowed");
        uploadBtn.innerText = "Upload";

        loading.classList.add("hidden");

        showToast("Something went wrong while uploading.");

    }

});
copyUrlBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(openImageBtn.href);

        copyUrlBtn.innerText = "Copied!";

        setTimeout(() => {
            copyUrlBtn.innerText = "Copy Image URL";
        }, 2000);

    } catch (err) {

        showToast("Failed to copy URL.");

    }

});
function resetApp() {

    imageInput.value = "";

    previewImage.src = "";

    previewContainer.classList.add("hidden");

    qrResult.classList.add("hidden");

    qrResult.classList.add("opacity-0");
    qrResult.classList.add("translate-y-10");

    fileName.innerText = "-";

    uploadTime.innerText = "-";

    qrImage.src = "";

    downloadBtn.href = "";

    openImageBtn.href = "";

}
newQrBtn.addEventListener("click", () => {

    resetApp();

    showToast("Ready for another upload.");

});
function showToast(message) {

    toastMessage.innerText = message;

    toast.classList.remove("hidden");

    setTimeout(() => {

        toast.classList.add("hidden");

    }, 3000);

}