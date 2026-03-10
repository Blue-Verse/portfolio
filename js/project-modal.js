import { createProjectPills, renderMetricChips, renderProjectShowcase } from "./project-shared.js";

function buildModalMarkup(project) {
    return `
        <header class="modal-header">
            <div>
                <p class="eyebrow">프로젝트 상세</p>
                <h2 id="modal-title">${project.titleKo}</h2>
                <p class="modal-subtitle">${project.titleEn}</p>
            </div>
            <div class="pill-row">${createProjectPills(project, [project.status, project.period])}</div>
        </header>
        ${renderProjectShowcase(project, { variant: "modal" })}
        <section class="modal-summary surface-panel">
            <strong>한 줄 설명</strong>
            <p>${project.summary}</p>
        </section>
        <div class="modal-grid">
            <section class="detail-card surface-panel">
                <strong>핵심 난이도</strong>
                <p>${project.challenge}</p>
            </section>
            <section class="detail-card surface-panel">
                <strong>구축 방식</strong>
                <p>${project.approach}</p>
            </section>
        </div>
        <div class="modal-grid">
            <section class="detail-card surface-panel">
                <strong>대표 근거</strong>
                <div class="metric-chip-row">${renderMetricChips(project.impactMetrics)}</div>
            </section>
            <section class="detail-card surface-panel">
                <strong>주요 포인트</strong>
                <ul class="detail-list">
                    ${project.highlights.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            </section>
        </div>
        <div class="modal-grid">
            <section class="detail-card surface-panel">
                <strong>기술 구성</strong>
                <div class="pill-row">${project.stack.map((item) => `<span class="project-pill">${item}</span>`).join("")}</div>
            </section>
            <section class="detail-card surface-panel">
                <strong>근거 메모</strong>
                <p>${project.evidenceNote}</p>
            </section>
        </div>
    `;
}

export function initProjectModal(projects) {
    const modal = document.querySelector("#project-modal");
    const modalContent = document.querySelector("#modal-content");
    const dialog = modal?.querySelector(".modal-card");
    const closeTargets = modal?.querySelectorAll("[data-close-modal]");

    if (!modal || !modalContent || !dialog || !closeTargets?.length) {
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
        document.body.classList.remove("has-open-modal");
        syncProjectQuery(null);
        if (lastTrigger instanceof HTMLElement) {
            lastTrigger.focus();
        }
    }

    function openModal(slug, trigger) {
        const project = projects.find((item) => item.slug === slug);
        if (!project) {
            return;
        }

        lastTrigger = trigger ?? null;
        modalContent.innerHTML = buildModalMarkup(project);
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("has-open-modal");
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

    closeTargets.forEach((target) => {
        target.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
            closeModal();
        }
    });

    const initialProject = new URL(window.location.href).searchParams.get("project");
    if (initialProject) {
        const trigger = document.querySelector(`[data-project-trigger="${initialProject}"]`);
        openModal(initialProject, trigger);
    }
}
