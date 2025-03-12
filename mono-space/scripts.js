// Function to save content for individual sections
function saveContent(sectionId, content) {
    // Save content to localStorage with the section ID as the key
    localStorage.setItem(sectionId, content);
}

// Function to retrieve saved content
function loadContent(sectionId) {
    const savedContent = localStorage.getItem(sectionId);
    if (savedContent) {
        document.getElementById(sectionId).innerHTML = savedContent;
    }
}

// Debounce function to save content after user stops typing
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// Function to handle the content editing and auto-saving
function handleContentEditing(sectionId) {
    const element = document.getElementById(sectionId);
    
    // Listen for input changes and save content after a delay
    element.addEventListener('input', debounce(function() {
        saveContent(sectionId, element.innerHTML);
    }, 1000));  // 1000ms delay after typing stops
}

// Event listener to handle the save button click for the projects list
document.getElementById('saveButton').addEventListener('click', function() {
    const projectsList = document.getElementById('editableList').innerHTML;
    saveContent('projectsList', projectsList);
});

// Load previously saved content when the page is loaded
window.addEventListener('load', function() {
    // Load content from localStorage into respective sections
    loadContent('introduction');
    loadContent('basics');
    loadContent('projects');
    loadContent('editableList');
    
    // Initialize content editing for each section
    handleContentEditing('introduction');
    handleContentEditing('basics');
    handleContentEditing('projects');
});
