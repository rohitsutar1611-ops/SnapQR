console.log("SnapQR script loaded successfully.");

const chooseBtn = document.getElementById("choose-btn");
const imageInput = document.getElementById("image-input");
const previewContainer = document.getElementById("preview-container");
const previewImage = document.getElementById("preview-image");
const removeBtn = document.getElementById("remove-btn");

// Allowed image types
const allowed = [
    "image/png",
    "image/jpeg",
    "image/webp"
];

// Open file picker
chooseBtn.addEventListener("click", () => {
    imageInput.click();
});

// Image selected
imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    // File type validation
    if (!allowed.includes(file.type)) {
        alert("Only PNG, JPG and WEBP images are allowed.");
        imageInput.value = "";
        return;
    }

    // File size validation (5 MB)
    if (file.size > 5 * 1024 * 1024) {
        alert("Maximum file size is 5 MB.");
        imageInput.value = "";
        return;
    }

    // Show preview
    previewContainer.classList.remove("hidden");
    previewImage.src = URL.createObjectURL(file);

});

// Remove image
removeBtn.addEventListener("click", () => {

    imageInput.value = "";
    previewImage.src = "";
    previewContainer.classList.add("hidden");

});