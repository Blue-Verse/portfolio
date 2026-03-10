import { PROJECTS } from "./projects-data.js";
import { initSiteShell } from "./site-shell.js";

function renderAboutStats() {
    const container = document.querySelector("#about-stats");
    if (!container) {
        return;
    }

    const koreanProjects = PROJECTS.filter((project) => project.market === "한국").length;
    const globalProjects = PROJECTS.filter((project) => project.market !== "한국").length;
    const featuredProjects = PROJECTS.filter((project) => project.featured).length;
    const sectors = new Set(PROJECTS.map((project) => project.sector)).size;

    const items = [
        {
            value: `${PROJECTS.length}개`,
            label: "분석 완료 프로젝트",
            description: "시장과 산업이 다른 실전 사례를 한 데이터 모델로 정리했습니다."
        },
        {
            value: `${koreanProjects}개`,
            label: "한국 시장 사례",
            description: "핀테크와 헬스케어 중심의 실무형 프로젝트를 가장 두텁게 보유하고 있습니다."
        },
        {
            value: `${globalProjects}개`,
            label: "글로벌/해외 확장 사례",
            description: "글로벌 커뮤니티, 베트남 네트워킹, Web3 플랫폼까지 확장 경험이 있습니다."
        },
        {
            value: `${featuredProjects}개`,
            label: "대표 신뢰 사례",
            description: "처음 보여줄 만한 프로젝트를 별도 선별해 포트폴리오 앞단에 배치했습니다."
        },
        {
            value: `${sectors}개`,
            label: "산업 카테고리",
            description: "한 분야에 갇히기보다 높은 복잡도 문제를 반복적으로 해결해 왔습니다."
        }
    ];

    container.innerHTML = items
        .map(
            (item) => `
                <article class="stat-card" data-reveal>
                    <strong>${item.value}</strong>
                    <p>${item.label}</p>
                    <p>${item.description}</p>
                </article>
            `
        )
        .join("");
}

renderAboutStats();
initSiteShell();
