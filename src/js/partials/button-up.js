document.addEventListener("DOMContentLoaded", () => {
	const buttonUp = document.querySelector(".button-up");

	if (!buttonUp) return;

	const toggleButton = () => {
		buttonUp.classList.toggle("is-visible", window.scrollY > 400);
	};

	window.addEventListener("scroll", toggleButton, { passive: true });
	toggleButton();

	buttonUp.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
});