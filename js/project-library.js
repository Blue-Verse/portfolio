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

function renderHeroProofCard(projects) {
    const container = document.querySelector("#hero-proof-card");
    if (!container) {
        return;
    }

    const koreanProjects = projects.filter((project) => project.market === "한국").length;
    const sectors = new Set(projects.map((project) => project.sector)).size;

    container.innerHTML = `
        <p class="eyebrow">핵심 범위</p>
        <h2>12개 사례를 운영 구조 기준으로 다시 정리했습니다.</h2>
        <p>대표 사례는 신뢰 판단에 바로 연결되는 프로젝트를 앞에 두고, 나머지 사례는 같은 기준으로 비교할 수 있게 구성했습니다.</p>
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
                <p class="flagship-label">대표 사례 01</p>
                <div class="flagship-header">
                    <div>
                        <h3>${project.titleKo}</h3>
                        <p class="flagship-subtitle">${project.tagline}</p>
                    </div>
                    <div class="pill-row">${createProjectPills(project, [project.period])}</div>
                </div>
                <p class="flagship-summary">${project.summary}</p>
                <div class="metric-chip-row">${renderMetricChips(project.impactMetrics, 3)}</div>
                <dl class="flagship-detail-list">
                    <div>
                        <dt>핵심 문제</dt>
                        <dd>${project.challenge}</dd>
                    </div>
                    <div>
                        <dt>구현 방식</dt>
                        <dd>${project.approach}</dd>
                    </div>
                </dl>
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
            (project, index) => `
                <article class="teaser-card surface-panel" data-reveal>
                    ${renderProjectShowcase(project, { variant: "teaser" })}
                    <div class="teaser-body">
                        <p class="teaser-label">대표 사례 ${String(index + 2).padStart(2, "0")}</p>
                        <div>
                            <h3>${project.titleKo}</h3>
                            <p class="teaser-subtitle">${project.tagline}</p>
                        </div>
                        <p class="teaser-summary">${project.challenge}</p>
                        <p class="teaser-metric">${project.impactMetrics[0]}</p>
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
        <div class="library-stat">
            <strong>${projects.length}개</strong>
            <span>전체 사례</span>
        </div>
        <div class="library-stat">
            <strong>${koreanProjects}개</strong>
            <span>한국 실무형 사례</span>
        </div>
        <div class="library-stat">
            <strong>${globalProjects}개</strong>
            <span>글로벌·해외 사례</span>
        </div>
        <div class="library-stat">
            <strong>${markets}개</strong>
            <span>시장 범위</span>
        </div>
        <p class="library-note">필터는 산업명이 아니라 구매자 관점의 문제 유형 기준으로 구성했습니다.</p>
    `;
}

function buildLibraryCard(project) {
    return `
        <article class="library-card surface-panel" data-reveal>
            <div class="library-card-top">
                <div class="library-card-head">
                    <span class="library-card-meta">${project.sector} · ${project.market}</span>
                    <div>
                        <h3>${project.titleKo}</h3>
                        <p class="library-card-tagline">${project.tagline}</p>
                    </div>
                </div>
                <span class="library-proof">${project.impactMetrics[0]}</span>
            </div>
            <p class="library-card-brief">${project.challenge}</p>
            <div class="library-card-footer">
                <span class="library-card-period">${project.period}</span>
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
    renderHeroProofCard(projects);
    renderFlagshipCase(featuredProjects);
    renderSecondaryFeatured(featuredProjects);
    renderLibraryOverview(projects);
    initProjectLibrary(projects);
}
