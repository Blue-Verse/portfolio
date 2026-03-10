import {
    createProjectPills,
    getPortfolioFilters,
    projectMatchesFilter,
    renderMetricChips,
    renderProjectShowcase
} from "./project-shared.js";

function setRenderedItemsVisible(container) {
    if (!document.documentElement.classList.contains("js-ready")) {
        return;
    }

    container.querySelectorAll("[data-reveal]").forEach((item) => {
        item.classList.add("is-visible");
    });
}

function renderHeroProofCard(projects, featuredProjects) {
    const container = document.querySelector("#hero-proof-card");
    if (!container) {
        return;
    }

    const koreanProjects = projects.filter((project) => project.market === "한국").length;
    const sectors = new Set(projects.map((project) => project.sector)).size;

    container.innerHTML = `
        <p class="eyebrow">검토 범위</p>
        <h2>한국 실무형 사례를 앞에 두고, 전체 12건을 비교 가능한 라이브러리로 정리했습니다.</h2>
        <ul class="hero-proof-list">
            <li>대표 사례는 규제, 결재, 현장 운영 프로젝트를 우선 배치했습니다</li>
            <li>전체 사례는 문제 유형 기준 필터로 다시 탐색할 수 있습니다</li>
            <li>각 사례는 한 줄 설명, 핵심 난이도, 대표 근거로 빠르게 읽을 수 있습니다</li>
        </ul>
        <div class="hero-proof-metrics">
            <article class="hero-proof-metric">
                <strong>${projects.length}개</strong>
                <span>전체 사례</span>
            </article>
            <article class="hero-proof-metric">
                <strong>${koreanProjects}개</strong>
                <span>한국 시장</span>
            </article>
            <article class="hero-proof-metric">
                <strong>${sectors}개</strong>
                <span>산업 카테고리</span>
            </article>
        </div>
        <div class="hero-proof-preview" aria-label="대표 사례 미리보기">
            ${featuredProjects
                .map(
                    (project) => `
                        <button class="hero-proof-preview-item" type="button" data-project-trigger="${project.slug}">
                            <span>${project.titleKo}</span>
                            <strong>${project.impactMetrics[0]}</strong>
                        </button>
                    `
                )
                .join("")}
        </div>
    `;
}

function renderFlagshipCase(featuredProjects) {
    const container = document.querySelector("#flagship-case-body");
    if (!container || !featuredProjects.length) {
        return;
    }

    const project = featuredProjects[0];
    container.innerHTML = `
        <article class="flagship-shell surface-panel" data-reveal>
            <div class="flagship-showcase">
                ${renderProjectShowcase(project, { variant: "flagship" })}
            </div>
            <div class="flagship-body">
                <div class="flagship-header">
                    <div>
                        <p class="eyebrow">Flagship Case</p>
                        <h3>${project.titleKo}</h3>
                        <p class="flagship-subtitle">${project.tagline}</p>
                    </div>
                    <div class="pill-row">${createProjectPills(project, [project.period])}</div>
                </div>
                <p class="flagship-summary">${project.summary}</p>
                <div class="flagship-kpi">
                    <span>대표 근거</span>
                    <strong>${project.impactMetrics[0]}</strong>
                </div>
                <div class="flagship-story-grid">
                    <article class="surface-muted">
                        <span>핵심 난이도</span>
                        <p>${project.challenge}</p>
                    </article>
                    <article class="surface-muted">
                        <span>구축 방식</span>
                        <p>${project.approach}</p>
                    </article>
                </div>
                <ul class="flagship-points">
                    ${project.highlights.slice(0, 3).map((item) => `<li>${item}</li>`).join("")}
                </ul>
                <div class="metric-chip-row">${renderMetricChips(project.impactMetrics, 3)}</div>
                <button class="button button-primary button-inline" type="button" data-project-trigger="${project.slug}">
                    상세 구조 보기
                </button>
            </div>
        </article>
    `;
}

function renderSecondaryFeatured(featuredProjects) {
    const container = document.querySelector("#secondary-featured");
    if (!container) {
        return;
    }

    container.innerHTML = featuredProjects
        .slice(1)
        .map(
            (project) => `
                <article class="teaser-card surface-panel" data-reveal>
                    ${renderProjectShowcase(project, { variant: "teaser" })}
                    <div class="teaser-body">
                        <div>
                            <h3>${project.titleKo}</h3>
                            <p class="teaser-subtitle">${project.tagline}</p>
                        </div>
                        <p class="teaser-summary">${project.highlights[0]}</p>
                        <div class="teaser-proof">
                            <span>대표 근거</span>
                            <strong>${project.impactMetrics[0]}</strong>
                        </div>
                        <button class="card-link" type="button" data-project-trigger="${project.slug}">
                            자세히 보기
                        </button>
                    </div>
                </article>
            `
        )
        .join("");
}

function renderLibraryOverview(projects) {
    const container = document.querySelector("#library-overview");
    if (!container) {
        return;
    }

    const koreanProjects = projects.filter((project) => project.market === "한국").length;
    const globalProjects = projects.filter((project) => project.market !== "한국").length;
    const markets = new Set(projects.map((project) => project.market)).size;

    container.innerHTML = `
        <div class="library-overview-grid">
            <article>
                <strong>${projects.length}개</strong>
                <span>전체 사례</span>
            </article>
            <article>
                <strong>${koreanProjects}개</strong>
                <span>한국 실무형 사례</span>
            </article>
            <article>
                <strong>${globalProjects}개</strong>
                <span>글로벌/해외 사례</span>
            </article>
            <article>
                <strong>${markets}개</strong>
                <span>시장 범위</span>
            </article>
        </div>
        <p class="library-overview-note">필터는 산업명이 아니라 구매자 관점의 문제 유형 기준으로 구성했습니다.</p>
    `;
}

function buildLibraryCard(project) {
    return `
        <article class="library-card surface-panel" data-reveal>
            ${renderProjectShowcase(project, { variant: "library" })}
            <div class="library-card-body">
                <div class="library-card-top">
                    <div>
                        <h3>${project.titleKo}</h3>
                        <p class="library-card-tagline">${project.tagline}</p>
                    </div>
                    <div class="pill-row">${createProjectPills(project, [project.period])}</div>
                </div>
                <p class="library-card-note">
                    <strong>핵심 난이도</strong>
                    <span>${project.highlights[0]}</span>
                </p>
                <div class="library-card-signal">
                    <span>대표 근거</span>
                    <strong>${project.impactMetrics[0]}</strong>
                </div>
                <button class="card-link" type="button" data-project-trigger="${project.slug}">
                    상세 보기
                </button>
            </div>
        </article>
    `;
}

function initProjectLibrary(projects) {
    const filtersContainer = document.querySelector("#project-filters");
    const gridContainer = document.querySelector("#project-library-grid");

    if (!filtersContainer || !gridContainer) {
        return;
    }

    const filters = getPortfolioFilters();
    let activeFilter = "all";

    function renderFilters() {
        filtersContainer.innerHTML = filters
            .map(
                (filter) => `
                    <button
                        class="filter-chip ${filter.key === activeFilter ? "is-active" : ""}"
                        type="button"
                        data-filter-key="${filter.key}"
                        aria-pressed="${String(filter.key === activeFilter)}"
                    >
                        <span>${filter.label}</span>
                        <small>${filter.description}</small>
                    </button>
                `
            )
            .join("");
    }

    function renderGrid() {
        const visibleProjects = projects.filter((project) => projectMatchesFilter(project, activeFilter));
        gridContainer.innerHTML = visibleProjects.map((project) => buildLibraryCard(project)).join("");
        setRenderedItemsVisible(gridContainer);
    }

    filtersContainer.addEventListener("click", (event) => {
        const button = event.target instanceof Element ? event.target.closest("[data-filter-key]") : null;
        if (!button) {
            return;
        }

        activeFilter = button.dataset.filterKey;
        renderFilters();
        renderGrid();
    });

    renderFilters();
    renderGrid();
}

export function renderPortfolioExperience({ projects, featuredProjects }) {
    renderHeroProofCard(projects, featuredProjects);
    renderFlagshipCase(featuredProjects);
    renderSecondaryFeatured(featuredProjects);
    renderLibraryOverview(projects);
    initProjectLibrary(projects);
}
