import { FEATURED_PROJECTS, PROJECTS } from "./projects-data.js";
import { initSiteShell } from "./site-shell.js";

const ARCHIVE_PROJECTS = PROJECTS.filter((project) => !project.featured);

const TONE_BY_SECTOR = {
    "핀테크": "tone-trust",
    "헬스케어": "tone-care",
    "피트니스": "tone-energy",
    "소셜 플랫폼": "tone-network",
    "B2B 네트워킹": "tone-network",
    "AI 툴링": "tone-ink",
    "게임": "tone-energy",
    "라이프스타일": "tone-energy",
    "Web3": "tone-depth"
};

function getProjectTone(project) {
    return TONE_BY_SECTOR[project.sector] ?? "tone-trust";
}

function renderHeroRoster() {
    const container = document.querySelector("#hero-roster");
    if (!container) {
        return;
    }

    container.innerHTML = `
        <section class="hero-roster-panel glass-panel">
            <div class="hero-roster-head">
                <div>
                    <p class="hero-roster-label">전체 사례 범위</p>
                    <strong>검토한 프로젝트 ${PROJECTS.length}개</strong>
                </div>
                <span>필요한 사례를 바로 열어 상세 구조를 확인할 수 있습니다.</span>
            </div>
            <div class="hero-roster-grid">
                ${PROJECTS.map((project) => `
                    <button class="hero-roster-chip" type="button" data-project-trigger="${project.slug}">
                        <span>${project.titleKo}</span>
                        <small>${project.sector} · ${project.market}</small>
                    </button>
                `).join("")}
            </div>
        </section>
    `;
}

function renderSignals() {
    const container = document.querySelector("#trust-signals");
    if (!container) {
        return;
    }

    const koreanProjects = PROJECTS.filter((project) => project.market === "한국").length;
    const markets = new Set(PROJECTS.map((project) => project.market)).size;
    const sectors = new Set(PROJECTS.map((project) => project.sector)).size;

    const signals = [
        { value: `${PROJECTS.length}개`, label: "전체 구축 사례", description: "templates 제외 기준 전량 반영" },
        { value: `${koreanProjects}개`, label: "한국 시장 사례", description: "실무형 신뢰 영역 우선 공개" },
        { value: `${markets}개`, label: "시장 범위", description: "한국 · 글로벌 · 베트남" },
        { value: `${sectors}개`, label: "산업 카테고리", description: "핀테크, 헬스케어, AI, Web3 등" }
    ];

    container.innerHTML = signals.map((signal) => `
        <article class="signal-card" data-reveal>
            <strong>${signal.value}</strong>
            <span>${signal.label}</span>
            <p>${signal.description}</p>
        </article>
    `).join("");
}

function createPills(project, extras = []) {
    return [project.sector, project.market, project.status, ...extras]
        .filter(Boolean)
        .map((value) => `<span class="pill">${value}</span>`)
        .join("");
}

function renderMetricList(metrics, limit = metrics.length) {
    return metrics.slice(0, limit).map((metric) => `<span>${metric}</span>`).join("");
}

function renderStackLine(stack, limit) {
    return stack.slice(0, limit).map((item) => `<span>${item}</span>`).join("");
}

function renderShowcase(project, variant = "archive") {
    const toneClass = getProjectTone(project);
    const head = `
        <div class="project-showcase-head">
            <span class="project-showcase-badge">${project.market}</span>
            <span class="project-showcase-badge muted">${project.period}</span>
        </div>
    `;

    if (project.showcaseImage) {
        const noteMarkup = project.showcaseImage.label
            ? `<figcaption class="project-showcase-note">${project.showcaseImage.label}</figcaption>`
            : "";

        return `
            <figure class="project-showcase image ${variant} ${toneClass}">
                ${head}
                <img src="${project.showcaseImage.src}" alt="${project.showcaseImage.alt}" loading="lazy">
                ${noteMarkup}
            </figure>
        `;
    }

    return `
        <figure class="project-showcase fallback ${variant} ${toneClass}">
            <div class="project-fallback-top">
                ${head}
                <div class="project-fallback-mark">
                    <span class="project-fallback-kicker">${project.sector}</span>
                    <img class="project-fallback-symbol" src="assets/1Asset 3@3x.png" alt="">
                </div>
                <div>
                    <strong>${project.titleKo}</strong>
                    <p>${project.titleEn}</p>
                </div>
            </div>
            <p class="project-fallback-copy">${project.tagline}</p>
            <div class="project-fallback-stat">
                <span>대표 지표</span>
                <strong>${project.impactMetrics[0]}</strong>
            </div>
            <div class="project-fallback-stack">
                ${renderStackLine(project.stack, 2)}
            </div>
        </figure>
    `;
}

function renderFeatured() {
    const container = document.querySelector("#featured-grid");
    if (!container) {
        return;
    }

    container.innerHTML = FEATURED_PROJECTS.map((project, index) => `
        <article class="project-card featured ${index === 0 ? "featured-primary" : "featured-secondary"}" data-reveal>
            ${renderShowcase(project, "featured")}
            <div class="project-card-body">
                <div class="project-card-header">
                    <div>
                        <h3>${project.titleKo}</h3>
                        <p class="project-subtitle">${project.titleEn}</p>
                    </div>
                    <div class="meta-block">${createPills(project)}</div>
                </div>
                <p class="project-summary ${index === 0 ? "lead" : ""}">${project.summary}</p>
                ${index === 0 ? `
                    <div class="featured-primary-signal">
                        <span>대표 지표</span>
                        <strong>${project.impactMetrics[0]}</strong>
                    </div>
                    <ul class="project-keypoints">
                        ${project.highlights.slice(0, 2).map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                    <div class="metric-row featured-metrics">
                        ${renderMetricList(project.impactMetrics, 3)}
                    </div>
                ` : `
                    <div class="featured-secondary-signal">
                        <span>대표 지표</span>
                        <strong>${project.impactMetrics[0]}</strong>
                    </div>
                    <p class="project-secondary-note">${project.highlights[0]}</p>
                `}
                <button class="card-action" type="button" data-project-trigger="${project.slug}">
                    구조와 결과 보기
                </button>
            </div>
        </article>
    `).join("");
}

function renderArchive() {
    const container = document.querySelector("#project-grid");
    if (!container) {
        return;
    }

    container.innerHTML = ARCHIVE_PROJECTS.map((project) => `
        <article class="project-card archive" data-reveal>
            ${renderShowcase(project, "archive")}
            <div class="project-card-body">
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
                <p class="project-summary archive-summary">${project.summary}</p>
                <div class="archive-signal">
                    <span>대표 지표</span>
                    <strong>${project.impactMetrics[0]}</strong>
                </div>
                <button class="card-action" type="button" data-project-trigger="${project.slug}">
                    상세 보기
                </button>
            </div>
        </article>
    `).join("");
}

function buildModalMarkup(project) {
    return `
        <header class="modal-header">
            <div class="meta-block">${createPills(project, [project.period])}</div>
            <div>
                <h2 id="modal-title">${project.titleKo}</h2>
                <p>${project.titleEn}</p>
            </div>
            <p>${project.tagline}</p>
        </header>
        ${renderShowcase(project, "modal")}
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
    const dialog = modal?.querySelector(".modal-card");

    if (!modal || !modalContent || !dialog) {
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

        lastTrigger = trigger ?? null;
        modalContent.innerHTML = buildModalMarkup(project);
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        syncProjectQuery(slug);
        dialog.focus();
    }

    document.addEventListener("click", (event) => {
        const trigger = event.target instanceof Element ? event.target.closest("[data-project-trigger]") : null;
        if (!trigger) {
            return;
        }

        event.preventDefault();
        openModal(trigger.dataset.projectTrigger, trigger);
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

renderHeroRoster();
renderSignals();
renderFeatured();
renderArchive();
initSiteShell();
initModal();
