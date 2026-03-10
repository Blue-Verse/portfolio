import { FEATURED_PROJECTS, PROJECTS } from "./projects-data.js";
import { initSiteShell } from "./site-shell.js";

function renderSignals() {
    const container = document.querySelector("#trust-signals");
    if (!container) {
        return;
    }

    const koreanProjects = PROJECTS.filter((project) => project.market === "한국").length;
    const markets = new Set(PROJECTS.map((project) => project.market)).size;
    const sectors = new Set(PROJECTS.map((project) => project.sector)).size;

    const signals = [
        { value: `${PROJECTS.length}개`, label: "분석된 전체 프로젝트" },
        { value: `${koreanProjects}개`, label: "한국 시장 중심 사례" },
        { value: `${markets}개`, label: "실제 대응 시장 범위" },
        { value: `${sectors}개`, label: "커버 산업 카테고리" }
    ];

    container.innerHTML = signals
        .map(
            (signal) => `
                <article class="signal-card">
                    <strong>${signal.value}</strong>
                    <span>${signal.label}</span>
                </article>
            `
        )
        .join("");
}

function createPills(project) {
    return [project.sector, project.market, project.status]
        .map((value) => `<span class="pill">${value}</span>`)
        .join("");
}

function renderFeatured() {
    const container = document.querySelector("#featured-grid");
    if (!container) {
        return;
    }

    container.innerHTML = FEATURED_PROJECTS.map((project, index) => {
        const layoutClass = index === 0 ? "featured-primary" : "featured-secondary";

        return `
            <article class="project-card featured ${layoutClass}" data-reveal>
                <div class="project-card-header">
                    <div>
                        <h3>${project.titleKo}</h3>
                        <p class="project-subtitle">${project.titleEn}</p>
                    </div>
                    <div class="meta-block">${createPills(project)}</div>
                </div>
                <p class="project-summary">${project.tagline}</p>
                <p class="project-summary">${project.summary}</p>
                <div class="metric-row">
                    ${project.impactMetrics.map((metric) => `<span>${metric}</span>`).join("")}
                </div>
                <button class="card-action" type="button" data-project-trigger="${project.slug}">
                    상세 보기
                </button>
            </article>
        `;
    }).join("");
}

function renderArchive() {
    const container = document.querySelector("#project-grid");
    if (!container) {
        return;
    }

    container.innerHTML = PROJECTS.map((project) => `
        <article class="project-card archive" data-reveal>
            <div>
                <div class="project-card-header">
                    <div>
                        <h3>${project.titleKo}</h3>
                        <p class="project-subtitle">${project.titleEn}</p>
                    </div>
                </div>
                <div class="project-meta-line">
                    <span>${project.sector}</span>
                    <span>${project.market}</span>
                    <span>${project.period}</span>
                </div>
            </div>
            <p class="project-summary">${project.tagline}</p>
            <div class="metric-row">
                ${project.impactMetrics.map((metric) => `<span>${metric}</span>`).join("")}
            </div>
            <div class="stack-line">
                ${project.stack.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}
            </div>
            <button class="card-action" type="button" data-project-trigger="${project.slug}">
                사례 열기
            </button>
        </article>
    `).join("");
}

function buildModalMarkup(project) {
    return `
        <header class="modal-header">
            <div class="meta-block">${createPills(project)}<span class="pill">${project.period}</span></div>
            <div>
                <h2 id="modal-title">${project.titleKo}</h2>
                <p>${project.titleEn}</p>
            </div>
            <p>${project.tagline}</p>
        </header>
        <section class="modal-summary">
            <strong>프로젝트 요약</strong>
            <p>${project.summary}</p>
        </section>
        <div class="modal-columns">
            <section class="modal-section">
                <h3>무엇이 어려웠나</h3>
                <p>${project.challenge}</p>
            </section>
            <section class="modal-section">
                <h3>어떻게 풀었나</h3>
                <p>${project.approach}</p>
            </section>
        </div>
        <div class="modal-columns">
            <section class="modal-section">
                <h3>핵심 지표</h3>
                <div class="modal-metrics">
                    ${project.impactMetrics.map((metric) => `<div>${metric}</div>`).join("")}
                </div>
            </section>
            <section class="modal-section">
                <h3>주요 포인트</h3>
                <ul class="modal-highlights">
                    ${project.highlights.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            </section>
        </div>
        <div class="modal-columns">
            <section class="modal-section">
                <h3>기술 구성</h3>
                <div class="stack-line">
                    ${project.stack.map((item) => `<span>${item}</span>`).join("")}
                </div>
            </section>
            <section class="modal-section">
                <h3>근거 메모</h3>
                <p>${project.evidenceNote}</p>
            </section>
        </div>
    `;
}

function initModal() {
    const modal = document.querySelector("#project-modal");
    const modalContent = document.querySelector("#modal-content");
    const closeButtons = document.querySelectorAll("[data-close-modal]");
    const triggerButtons = document.querySelectorAll("[data-project-trigger]");
    const dialog = modal?.querySelector(".modal-card");

    if (!modal || !modalContent || !dialog || !triggerButtons.length) {
        return;
    }

    let lastTrigger = null;

    function syncProjectQuery(slug) {
        const nextUrl = new URL(window.location.href);
        if (slug) {
            nextUrl.searchParams.set("project", slug);
        } else {
            nextUrl.searchParams.delete("project");
        }

        window.history.replaceState({}, "", nextUrl);
    }

    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        syncProjectQuery(null);
        if (lastTrigger instanceof HTMLElement) {
            lastTrigger.focus();
        }
    }

    function openModal(slug, trigger) {
        const project = PROJECTS.find((item) => item.slug === slug);
        if (!project) {
            return;
        }

        lastTrigger = trigger;
        modalContent.innerHTML = buildModalMarkup(project);
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        syncProjectQuery(slug);
        dialog.focus();
    }

    triggerButtons.forEach((button) => {
        button.addEventListener("click", () => openModal(button.dataset.projectTrigger, button));
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
            closeModal();
        }
    });

    const initialProject = new URL(window.location.href).searchParams.get("project");
    if (initialProject) {
        const initialTrigger = document.querySelector(`[data-project-trigger="${initialProject}"]`);
        openModal(initialProject, initialTrigger);
    }
}

renderSignals();
renderFeatured();
renderArchive();
initSiteShell();
initModal();
