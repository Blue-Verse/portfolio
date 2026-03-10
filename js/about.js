import { PROJECTS } from "./projects-data.js";
import { initSiteShell } from "./site-shell.js";

function getAboutFacts() {
    const koreanProjects = PROJECTS.filter((project) => project.market === "한국").length;
    const globalProjects = PROJECTS.filter((project) => project.market !== "한국").length;
    const featuredProjects = PROJECTS.filter((project) => project.featured).length;
    const sectors = new Set(PROJECTS.map((project) => project.sector)).size;

    return {
        koreanProjects,
        globalProjects,
        featuredProjects,
        sectors
    };
}

function renderAboutHeroMetrics() {
    const container = document.querySelector("#about-hero-metrics");
    if (!container) {
        return;
    }

    const { koreanProjects, sectors } = getAboutFacts();
    const items = [
        { value: `${PROJECTS.length}개`, label: "전체 사례" },
        { value: `${koreanProjects}개`, label: "한국 시장" },
        { value: `${sectors}개`, label: "산업 카테고리" }
    ];

    container.innerHTML = `
        <div class="about-hero-metrics-grid">
            ${items
                .map(
                    (item) => `
                        <article class="about-hero-metric">
                            <strong>${item.value}</strong>
                            <span>${item.label}</span>
                        </article>
                    `
                )
                .join("")}
        </div>
    `;
}

function renderCoverageStats() {
    const container = document.querySelector("#about-stats");
    if (!container) {
        return;
    }

    const { koreanProjects, globalProjects, featuredProjects } = getAboutFacts();

    const items = [
        {
            value: `${PROJECTS.length}개`,
            label: "구축 사례",
            description: "전체 프로젝트를 같은 기준으로 다시 정리했습니다."
        },
        {
            value: `${koreanProjects}개`,
            label: "한국 실무형 사례",
            description: "핀테크와 헬스케어 중심의 실무형 구조를 두텁게 다뤘습니다."
        },
        {
            value: `${globalProjects}개`,
            label: "글로벌·해외 사례",
            description: "글로벌 모바일 서비스와 해외 대상 구조까지 포함합니다."
        },
        {
            value: `${featuredProjects}개`,
            label: "대표 사례",
            description: "신뢰 판단에 직접 연결되는 사례를 앞에 배치했습니다."
        }
    ];

    container.innerHTML = items
        .map(
            (item) => `
                <article class="coverage-stat surface-panel" data-reveal>
                    <strong>${item.value}</strong>
                    <span>${item.label}</span>
                    <p>${item.description}</p>
                </article>
            `
        )
        .join("");
}

renderAboutHeroMetrics();
renderCoverageStats();
initSiteShell();
