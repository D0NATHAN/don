const dropZone = document.getElementById("dropZone");
const imageContainer = document.getElementById("imageContainer");

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("hover");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("hover");
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("hover");
    
    const files = event.dataTransfer.files;

    for (let file of files) {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target.result;
                imageContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Only image files are supported!");
        }
    }
});

