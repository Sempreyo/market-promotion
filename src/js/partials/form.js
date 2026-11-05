document.addEventListener("DOMContentLoaded", () => {
	const forms = document.querySelectorAll(".js-lead-form");

	if (!forms.length) return;

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	const setFieldState = (field, isValid) => {
		const wrapper = field.closest(".form__field");

		field.classList.toggle("is-invalid", !isValid);

		if (wrapper) {
			wrapper.classList.toggle("has-error", !isValid);
		}
	};

	const validateField = (field) => {
		if (field.type === "checkbox") {
			const isValid = field.checked;

			field.classList.toggle("is-invalid", !isValid);

			return isValid;
		}

		const value = field.value.trim();

		if (field.hasAttribute("required") && !value) {
			setFieldState(field, false);
			return false;
		}

		if (field.type === "email" && value && !emailPattern.test(value)) {
			setFieldState(field, false);
			return false;
		}

		if (field.type === "tel" && value && value.replace(/\D/g, "").length < 10) {
			setFieldState(field, false);
			return false;
		}

		setFieldState(field, true);
		return true;
	};

	forms.forEach((form) => {
		const fields = Array.from(form.querySelectorAll(".form__input, .form__checkbox"));

		fields.forEach((field) => {
			field.addEventListener("blur", () => {
				if (field.type !== "checkbox") validateField(field);
			});

			field.addEventListener("input", () => {
				if (field.classList.contains("is-invalid")) validateField(field);
			});

			field.addEventListener("change", () => {
				if (field.type === "checkbox") validateField(field);
			});
		});

		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			const invalid = fields.filter((field) => !validateField(field));

			if (invalid.length) {
				invalid[0].focus();
				return;
			}

			const button = form.querySelector("button[type='submit']");
			const endpoint = form.dataset.endpoint;

			if (button) button.classList.add("is-loading");

			try {
				if (endpoint) {
					const response = await fetch(endpoint, {
						method: "POST",
						body: new FormData(form),
						headers: { Accept: "application/json" }
					});

					if (!response.ok) throw new Error(`Request failed: ${response.status}`);
				}

				form.classList.add("is-sent");
				form.reset();
				fields.forEach((field) => setFieldState(field, true));
			} catch (error) {
				form.querySelectorAll(".form__error").forEach((el) => {
					el.textContent = "Не удалось отправить заявку. Попробуйте ещё раз.";
				});

				fields.forEach((field) => {
					if (!field.value) setFieldState(field, false);
				});

				console.error(error);
			} finally {
				if (button) button.classList.remove("is-loading");
			}
		});
	});
});