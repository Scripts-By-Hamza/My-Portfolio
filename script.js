function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', () => {
    const projectContent = document.getElementById('projects-js');

    if (projectContent && typeof projects !== 'undefined') {
        projectContent.innerHTML = projects.map(project => `

        <div class="details-container color-container">
            <div class="article-container">
              <img
                src="${project.image}"
                alt="Project 1"
                class="project-img"
              />
            </div>
            <h2 class="experience-sub-title project-title">
              ${project.name}
            </h2>
            <div class="btn-container">
              <button
                class="btn btn-color-2 project-btn"
                onclick="location.href='${project.github}'"
              >
                Github
              </button>
               <button
                class="btn btn-color-2 project-btn"
                onclick="location.href='${project.live}'"
              >
                Live Demo
              </button>
            </div>
        </div>
        `).join('');
    }
});