export function initSiteShell() {
    const currentPage = document.body.dataset.page;

    document.querySelectorAll("[data-nav-page]").forEach((link) => {
        if (link.dataset.navPage === currentPage) {
            link.classList.add("is-active");
        }
    });

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });

    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (!revealTargets.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -48px 0px"
        }
    );

    revealTargets.forEach((target) => observer.observe(target));
}
