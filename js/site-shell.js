export function initSiteShell() {
    document.documentElement.classList.add("js-ready");

    const currentPage = document.body.dataset.page;
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("#site-nav");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("[data-nav-page]").forEach((link) => {
        if (link.dataset.navPage === currentPage) {
            link.classList.add("is-active");
        }
    });

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });

    if (menuToggle && menu) {
        function setMenuOpen(isOpen) {
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menu.classList.toggle("is-open", isOpen);
            document.body.classList.toggle("has-open-menu", isOpen);
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            setMenuOpen(!isOpen);
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                setMenuOpen(false);
            });
        });

        document.addEventListener("click", (event) => {
            if (!(event.target instanceof Element)) {
                return;
            }

            if (!menu.classList.contains("is-open")) {
                return;
            }

            if (menu.contains(event.target) || menuToggle.contains(event.target)) {
                return;
            }

            setMenuOpen(false);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 860) {
                setMenuOpen(false);
            }
        });
    }

    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (!revealTargets.length || reduceMotion) {
        revealTargets.forEach((target) => target.classList.add("is-visible"));
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
            threshold: 0.16,
            rootMargin: "0px 0px -56px 0px"
        }
    );

    revealTargets.forEach((target) => observer.observe(target));
}
