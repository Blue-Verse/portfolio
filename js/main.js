import { PROJECTS, TRUST_METRICS } from "./projects-data.js";

const trustMetricsRoot = document.querySelector("#trust-metrics");
const featuredRoot = document.querySelector("#featured-projects-grid");
const portfolioRoot = document.querySelector("#portfolio-grid");
const modalRoot = document.querySelector("#project-modal");
const modalBody = document.querySelector("#project-modal-body");
const modalDialog = modalRoot?.querySelector(".project-modal-dialog");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

let lastFocusedElement = null;

const statusLabelMap = {
    active: "진행 중",
    completed: "완료",
    dormant: "보관 중",
};

const escapeHtml = (value) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const createMetricMarkup = (metric) => `
    <div class="metric-card">
        <strong>${escapeHtml(metric.value)}</strong>
        <span>${escapeHtml(metric.label)}</span>
    </div>
`;

const createStackMarkup = (items, className = "stack-chip") =>
    items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join("");

const createCardMarkup = (project, variantClass = "portfolio-card") => `
    <button class="project-card ${variantClass} reveal" type="button" data-project-slug="${escapeHtml(project.slug)}" aria-label="${escapeHtml(project.titleKo)} 상세 보기">
        <div class="project-card-top">
            <span class="project-badge">${escapeHtml(project.sector)}</span>
            <span class="project-status">${escapeHtml(statusLabelMap[project.status] ?? project.status)}</span>
        </div>
        <div>
            <h3>${escapeHtml(project.titleKo)}</h3>
            <span class="project-english">${escapeHtml(project.titleEn)}</span>
            <p class="project-tagline">${escapeHtml(project.tagline)}</p>
            <p class="project-summary">${escapeHtml(project.summary)}</p>
        </div>
        <div class="project-meta">
            <span class="meta-chip">${escapeHtml(project.market)}</span>
            <span class="meta-chip">${escapeHtml(project.strengths[0])}</span>
        </div>
        <div class="project-metrics">
            ${project.impactMetrics.map(createMetricMarkup).join("")}
        </div>
        <div class="project-card-footer">
            <div class="stack-list">${createStackMarkup(project.stack.slice(0, 4))}</div>
            <span class="project-open">상세 보기</span>
        </div>
    </button>
`;

const renderTrustMetrics = () => {
    if (!trustMetricsRoot) {
        return;
    }

    trustMetricsRoot.innerHTML = TRUST_METRICS.map(
        (metric) => `
            <article class="trust-metric">
                <strong>${escapeHtml(metric.value)}</strong>
                <span>${escapeHtml(metric.label)}</span>
            </article>
        `,
    ).join("");
};

const renderFeaturedProjects = () => {
    if (!featuredRoot) {
        return;
    }

    const featuredProjects = PROJECTS.filter((project) => project.featured);
    const [mainProject, ...sideProjects] = featuredProjects;

    featuredRoot.innerHTML = `
        ${createCardMarkup(mainProject, "featured-main")}
        <div class="featured-side">
            ${sideProjects.map((project) => createCardMarkup(project, "featured-side-card")).join("")}
        </div>
    `;
};

const renderPortfolioGrid = () => {
    if (!portfolioRoot) {
        return;
    }

    portfolioRoot.innerHTML = PROJECTS.map((project) => createCardMarkup(project)).join("");
};

const createModalMarkup = (project) => {
    const linkMarkup = project.publicLinks.length
        ? `
            <div class="modal-link-card">
                <h4>확인 가능한 공개 링크</h4>
                <div class="modal-links">
                    ${project.publicLinks.map((link) => `
                        <a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>
                    `).join("")}
                </div>
            </div>
        `
        : `
            <div class="modal-link-card">
                <h4>공개 링크 정책</h4>
                <p>확인되지 않은 저장소 링크는 노출하지 않습니다. 이 프로젝트는 내부 산출물과 정량 지표 기준으로 소개합니다.</p>
            </div>
        `;

    return `
        <div class="modal-layout">
            <header class="modal-header">
                <p class="section-kicker">${escapeHtml(project.sector)} · ${escapeHtml(project.market)}</p>
                <h3 id="project-modal-title">${escapeHtml(project.titleKo)}</h3>
                <span class="project-english">${escapeHtml(project.titleEn)}</span>
                <p>${escapeHtml(project.tagline)}</p>
            </header>

            <section class="modal-highlights">
                ${project.impactMetrics.map((metric) => `
                    <article class="modal-metric">
                        <strong>${escapeHtml(metric.value)}</strong>
                        <span>${escapeHtml(metric.label)}</span>
                    </article>
                `).join("")}
            </section>

            <section class="modal-block-grid">
                <article class="modal-block">
                    <h4>무엇이 문제였나</h4>
                    <p>${escapeHtml(project.problem)}</p>
                </article>
                <article class="modal-block">
                    <h4>어떻게 풀었나</h4>
                    <p>${escapeHtml(project.solution)}</p>
                </article>
            </section>

            <section class="modal-block">
                <h4>프로젝트 요약</h4>
                <p>${escapeHtml(project.summary)}</p>
            </section>

            <section class="modal-block">
                <h4>핵심 강점</h4>
                <div class="modal-strengths">
                    ${createStackMarkup(project.strengths, "meta-chip")}
                </div>
            </section>

            <section class="modal-block">
                <h4>기술 스택</h4>
                <div class="modal-stack-list">
                    ${createStackMarkup(project.stack, "stack-chip")}
                </div>
            </section>

            ${linkMarkup}
        </div>
    `;
};

const openModal = (project) => {
    if (!modalRoot || !modalBody || !modalDialog) {
        return;
    }

    lastFocusedElement = document.activeElement;
    modalBody.innerHTML = createModalMarkup(project);
    modalRoot.classList.add("is-open");
    modalRoot.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalDialog.focus();
};

const closeModal = () => {
    if (!modalRoot || !modalBody) {
        return;
    }

    modalRoot.classList.remove("is-open");
    modalRoot.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";

    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
};

const trapFocus = (event) => {
    if (!modalRoot?.classList.contains("is-open") || event.key !== "Tab") {
        return;
    }

    const focusable = modalRoot.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable.length) {
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
};

const bindProjectCards = () => {
    document.querySelectorAll("[data-project-slug]").forEach((button) => {
        button.addEventListener("click", () => {
            const project = PROJECTS.find((item) => item.slug === button.dataset.projectSlug);
            if (project) {
                openModal(project);
            }
        });
    });
};

const initModalEvents = () => {
    if (!modalRoot) {
        return;
    }

    modalRoot.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modalRoot.classList.contains("is-open")) {
            closeModal();
        }

        trapFocus(event);
    });
};

const initNav = () => {
    if (!navToggle || !navMenu) {
        return;
    }

    navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        navMenu.classList.toggle("is-open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.setAttribute("aria-expanded", "false");
            navMenu.classList.remove("is-open");
        });
    });
};

const initRevealObserver = () => {
    document.documentElement.classList.add("js-motion");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
        if (element.getBoundingClientRect().top <= window.innerHeight * 0.92) {
            element.classList.add("is-visible");
            return;
        }

        observer.observe(element);
    });
};

const init = () => {
    renderTrustMetrics();
    renderFeaturedProjects();
    renderPortfolioGrid();
    bindProjectCards();
    initModalEvents();
    initNav();
    initRevealObserver();
};

init();
