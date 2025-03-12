const projectList = document.querySelector(".project-list");

function loadProjects() {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || {};
    projectList.querySelectorAll("li").forEach((item, index) => {
        const projectName = item.querySelector(".project-name");
        const projectId = `project-${index}`;

        projectName.setAttribute("data-id", projectId);
        projectName.textContent = savedProjects[projectId]?.name || projectName.textContent;

        if (savedProjects[projectId]?.completed) {
            item.classList.add("completed");
        }
    });
}

function saveProjects() {
    const projects = {};
    projectList.querySelectorAll("li").forEach((item, index) => {
        const projectName = item.querySelector(".project-name");
        const projectId = `project-${index}`;
        projects[projectId] = {
            name: projectName.textContent,
            completed: item.classList.contains("completed"),
        };
    });
    localStorage.setItem("projects", JSON.stringify(projects));
}

projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-name")) {
        e.target.parentElement.classList.toggle("completed");
        saveProjects();
    }
});

projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-button")) {
        const projectName = e.target.previousElementSibling.textContent.trim();
        window.open(`details.html?project=${encodeURIComponent(projectName)}`, "_blank");
    }
});

projectList.addEventListener("input", (e) => {
    if (e.target.classList.contains("project-name")) {
        saveProjects();
    }
});

window.addEventListener("load", loadProjects);
