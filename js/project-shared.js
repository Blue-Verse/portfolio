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

const FILTERS = [
    {
        key: "all",
        label: "전체",
        description: "12개 전체 사례"
    },
    {
        key: "regulated",
        label: "승인·규제·정합성",
        description: "심사, 결재, 규제 대응",
        slugs: ["series-b", "ez-approve", "p2p-funding"]
    },
    {
        key: "operations",
        label: "운영·현장·멀티액터",
        description: "현장 운영, 관리자, 다중 역할",
        slugs: ["harmony-link", "pilates-app", "connectin"]
    },
    {
        key: "growth",
        label: "사용자 성장·모바일",
        description: "모바일 서비스와 사용자 리텐션",
        slugs: ["calendar-share", "daystarter", "casual-game"]
    },
    {
        key: "frontier",
        label: "AI·Web3·신규 구조",
        description: "새 기술과 신규 서비스 구조",
        slugs: ["ai-agent", "life3", "nft-defi"]
    }
];

function renderShowcaseHead(project) {
    return `
        <div class="showcase-head">
            <span class="showcase-badge">${project.market}</span>
            <span class="showcase-badge muted">${project.period}</span>
        </div>
    `;
}

function getToneClass(project) {
    return TONE_BY_SECTOR[project.sector] ?? "tone-trust";
}

export function getPortfolioFilters() {
    return FILTERS;
}

export function projectMatchesFilter(project, filterKey) {
    if (filterKey === "all") {
        return true;
    }

    const targetFilter = FILTERS.find((filter) => filter.key === filterKey);
    return targetFilter?.slugs?.includes(project.slug) ?? false;
}

export function createProjectPills(project, extras = []) {
    return [project.sector, project.market, ...extras]
        .filter(Boolean)
        .map((value) => `<span class="project-pill">${value}</span>`)
        .join("");
}

export function renderMetricChips(metrics, limit = metrics.length) {
    return metrics
        .slice(0, limit)
        .map((metric) => `<span class="metric-chip">${metric}</span>`)
        .join("");
}

export function renderProjectShowcase(project, options = {}) {
    const variant = options.variant ?? "library";
    const toneClass = getToneClass(project);

    if (project.showcaseImage) {
        const noteMarkup = project.showcaseImage.label
            ? `<figcaption class="showcase-note">${project.showcaseImage.label}</figcaption>`
            : "";

        return `
            <figure class="showcase ${variant} ${toneClass}">
                ${renderShowcaseHead(project)}
                <img class="showcase-image" src="${project.showcaseImage.src}" alt="${project.showcaseImage.alt}" loading="lazy">
                ${noteMarkup}
            </figure>
        `;
    }

    return `
        <figure class="showcase ${variant} ${toneClass}">
            ${renderShowcaseHead(project)}
            <div class="showcase-fallback">
                <span class="showcase-sector">${project.sector}</span>
                <div class="showcase-fallback-head">
                    <div>
                        <strong>${project.titleKo}</strong>
                        <p>${project.titleEn}</p>
                    </div>
                    <img class="showcase-symbol" src="assets/1Asset 3@3x.png" alt="">
                </div>
                <p class="showcase-tagline">${project.tagline}</p>
                <div class="showcase-signal">
                    <span>대표 근거</span>
                    <strong>${project.impactMetrics[0]}</strong>
                </div>
            </div>
        </figure>
    `;
}
