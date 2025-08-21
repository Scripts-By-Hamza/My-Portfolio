function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', () => {
    const projectContent = document.getElementById('projects-js');
    const overlay = document.getElementById('project-detail-overlay');
    const closeBtn = overlay ? overlay.querySelector('.close-detail') : null; // legacy support
    const pillClose = overlay ? overlay.querySelector('.pill-close') : null;  // themed close
    const detailImage = document.getElementById('detail-image');
    const detailTitle = document.getElementById('detail-title');
    const detailSubtitle = document.getElementById('detail-subtitle');
    const detailDesc = document.getElementById('detail-description');
    const detailGithub = document.getElementById('detail-github');
    const detailLive = document.getElementById('detail-live');

    if (projectContent && typeof projects !== 'undefined') {
        projectContent.innerHTML = projects.map((project, idx) => `

        <div class="project-card color-container">
          <img src="${project.image}" alt="${project.name}" class="project-card-img" />
          <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-subtitle">${project.languages || ''}</p>
          </div>
          <div class="project-card-divider"></div>
          <div class="project-card-actions">
            <button class="btn btn-outline-black project-details-btn" data-index="${idx}">Details</button>
            ${project.live ? `<button class="btn btn-black project-live-btn" data-live="${project.live}">Live</button>` : ''}
          </div>
        </div>
        `).join('');

        // Attach click handlers to open detail overlay
        const detailButtons = document.querySelectorAll('.project-details-btn');
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                const p = projects[index];
                if (!overlay || !p) return;
                // Populate
                if (detailImage) detailImage.src = p.image || '';
                if (detailImage) detailImage.alt = p.name || 'Project image';
                if (detailTitle) detailTitle.textContent = p.name || '';
                if (detailSubtitle) detailSubtitle.textContent = p.languages ? `Tech • ${p.languages}` : '';
                if (detailDesc) detailDesc.textContent = p.description || '';
                // Reset optional lists (inclusions/highlights) if you add them later in project.js
                const incWrap = document.getElementById('detail-inclusions-wrap');
                const highWrap = document.getElementById('detail-highlights-wrap');
                const incList = document.getElementById('detail-inclusions');
                const highList = document.getElementById('detail-highlights');
                if (incWrap && incList) { incWrap.style.display = 'none'; incList.innerHTML = ''; }
                if (highWrap && highList) { highWrap.style.display = 'none'; highList.innerHTML = ''; }
                if (detailGithub) {
                    if (p.github) { detailGithub.href = p.github; detailGithub.style.display = ''; }
                    else { detailGithub.removeAttribute('href'); detailGithub.style.display = 'none'; }
                }
                if (detailLive) {
                    if (p.live) { detailLive.href = p.live; detailLive.style.display = ''; }
                    else { detailLive.removeAttribute('href'); detailLive.style.display = 'none'; }
                }
                overlay.classList.add('open');
                overlay.setAttribute('aria-hidden', 'false');
                // Prevent background scroll
                document.body.style.overflow = 'hidden';
            });
        });

        // Attach click handlers for Live buttons (navigate)
        document.querySelectorAll('.project-live-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.currentTarget.getAttribute('data-live');
                if (url) window.open(url, '_blank', 'noopener');
            });
        });
    }

    // Close handlers for overlay
    if (overlay) {
        const closeOverlay = () => {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
        if (pillClose) pillClose.addEventListener('click', closeOverlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('open')) {
                closeOverlay();
            }
        });
    }
});