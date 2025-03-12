function addNewRant() {
    const rantsContainer = document.getElementById("rantsContainer");
    const now = new Date();
    const rantId = `rant_${Date.now()}`;
    
    const rantBox = document.createElement("div");
    rantBox.classList.add("rant-box");
    rantBox.contentEditable = true;
    rantBox.setAttribute("data-id", rantId);

    const rantDate = document.createElement("div");
    rantDate.classList.add("rant-date");
    rantDate.innerText = `Created on: ${now.toLocaleString()}`;

    rantBox.appendChild(rantDate);
    rantBox.appendChild(document.createTextNode("Start writing your rant here..."));

    rantsContainer.appendChild(rantBox);

    saveRants();
}

function saveRants() {
    const rantBoxes = document.querySelectorAll(".rant-box");
    const rantsData = [];

    rantBoxes.forEach((box) => {
        rantsData.push({
            id: box.getAttribute("data-id"),
            date: box.querySelector(".rant-date").innerText,
            content: box.innerText.replace(box.querySelector(".rant-date").innerText, '').trim()
        });
    });

    localStorage.setItem("rants", JSON.stringify(rantsData));
}

function loadRants() {
    const savedRants = JSON.parse(localStorage.getItem("rants")) || [];
    const rantsContainer = document.getElementById("rantsContainer");

    savedRants.forEach((rant) => {
        const rantBox = document.createElement("div");
        rantBox.classList.add("rant-box");
        rantBox.contentEditable = true;
        rantBox.setAttribute("data-id", rant.id);

        const rantDate = document.createElement("div");
        rantDate.classList.add("rant-date");
        rantDate.innerText = rant.date;

        rantBox.appendChild(rantDate);
        rantBox.appendChild(document.createTextNode(rant.content));

        rantsContainer.appendChild(rantBox);
    });
}

window.addEventListener("load", () => {
    loadRants();
    document.getElementById("addRantButton").addEventListener("click", addNewRant);
    
    document.getElementById("rantsContainer").addEventListener("input", saveRants);
});
