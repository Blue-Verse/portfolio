import { FEATURED_PROJECTS, PROJECTS } from "./projects-data.js";
import { renderPortfolioExperience } from "./project-library.js";
import { initProjectModal } from "./project-modal.js";
import { initSiteShell } from "./site-shell.js";

renderPortfolioExperience({
    projects: PROJECTS,
    featuredProjects: FEATURED_PROJECTS
});
initSiteShell();
initProjectModal(PROJECTS);
