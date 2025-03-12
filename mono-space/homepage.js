// Function to save the content of editable sections to localStorage
function saveContent() {
    const sections = document.querySelectorAll('[contenteditable="true"]'); // Select all editable sections
    sections.forEach((section) => {
        const sectionId = section.id; // Get the ID of the section
        const content = section.innerHTML; // Get the content inside the editable section
        localStorage.setItem(sectionId, content); // Save content to localStorage with section ID as key
    });
}

// Function to load content from localStorage into the editable sections
function loadContent() {
    const sections = document.querySelectorAll('[contenteditable="true"]');
    sections.forEach((section) => {
        const sectionId = section.id; // Get the ID of the section
        const savedContent = localStorage.getItem(sectionId); // Retrieve saved content from localStorage
        if (savedContent) {
            section.innerHTML = savedContent; // If content exists, set it in the editable section
        }
    });
}

// Save content after typing stops (debounce function)
let typingTimer;
const doneTypingInterval = 1000; // Set a delay of 1 second before saving content

function doneTyping() {
    saveContent();
}

document.querySelectorAll('[contenteditable="true"]').forEach((section) => {
    section.addEventListener('input', function() {
        clearTimeout(typingTimer); // Clear the previous timer
        typingTimer = setTimeout(doneTyping, doneTypingInterval); // Set a new timer for 1 second
    });
});

// Event listener for the save button to manually save content
document.getElementById('saveButton').addEventListener('click', function() {
    saveContent();
    alert("Content saved!");
});

// Load the saved content when the page loads
window.addEventListener('load', loadContent);
