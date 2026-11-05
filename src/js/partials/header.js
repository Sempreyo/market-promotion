document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".header");

	if (!header) return;

	const burger = header.querySelector(".header__burger");
	const mobile = header.querySelector(".header__mobile");

	const closeMenu = () => {
		header.classList.remove("is-open");
		document.body.classList.remove("is-locked");

		if (burger) {
			burger.setAttribute("aria-expanded", "false");
			burger.setAttribute("aria-label", "Открыть меню");
		}
	};

	if (burger && mobile) {
		burger.addEventListener("click", () => {
			const isOpen = header.classList.toggle("is-open");

			document.body.classList.toggle("is-locked", isOpen);
			burger.setAttribute("aria-expanded", String(isOpen));
			burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
		});

		mobile.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", closeMenu);
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeMenu();
		});

		window.addEventListener("resize", () => {
			if (window.innerWidth > 1023) closeMenu();
		});
	}

	const onScroll = () => {
		header.classList.toggle("is-scrolled", window.scrollY > 8);
	};

	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	// Подсветка активного раздела в навигации
	const links = Array.from(document.querySelectorAll(".header__link[href^='#']"));
	const sections = links
		.map((link) => document.querySelector(link.getAttribute("href")))
		.filter(Boolean);

	if (!sections.length || !("IntersectionObserver" in window)) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				links.forEach((link) => {
					link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
				});
			});
		},
		{ rootMargin: "-45% 0px -50% 0px", threshold: 0 }
	);

	sections.forEach((section) => observer.observe(section));
});