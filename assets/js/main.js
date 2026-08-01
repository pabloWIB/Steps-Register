/**
 * Steps Register — three-step registration form.
 *
 * Every step lives in the document from the start; this script decides which
 * one is on screen, validates the two that take input, and mirrors the answers
 * into the summary. Nothing is sent anywhere: there is no server behind it.
 *
 * Wrapped in an IIFE so the page is left with no globals of its own, and
 * loaded with `defer` rather than as an ES module so the file keeps working
 * when index.html is opened straight off disk.
 */
(() => {
  "use strict";

  /* ----------------------------------------------------------------------
     Elements
     ---------------------------------------------------------------------- */

  const byId = (id) => document.getElementById(id);

  const TOTAL_STEPS = 3;

  const steps = [
    { id: "step-details", position: 1 },
    { id: "step-topics", position: 2 },
    { id: "step-summary", position: 3 },
    { id: "step-done", position: 4 }
  ];

  const detailsForm = byId("form-details");
  const topicsForm = byId("form-topics");
  const nameInput = byId("name");
  const emailInput = byId("email");
  const nameError = byId("name-error");
  const emailError = byId("email-error");
  const topicsGroup = byId("topics");
  const topicsError = byId("topics-error");
  const summaryName = byId("summary-name");
  const summaryEmail = byId("summary-email");
  const summaryTopics = byId("summary-topics");
  const confirmButton = byId("confirm");
  const restartButton = byId("restart");
  const stepperLabel = byId("stepper-label");
  const stepperDots = document.querySelectorAll(".stepper__dot");

  // If the markup this script depends on is not there, do nothing rather than
  // throw halfway through wiring things up.
  if (!detailsForm || !topicsForm || !nameInput || !emailInput || !topicsGroup) {
    return;
  }

  /* ----------------------------------------------------------------------
     Navigation
     ---------------------------------------------------------------------- */

  /** Reflects the current step in the dots and the "Step n of 3" label. */
  const updateStepper = (position) => {
    if (stepperLabel) {
      stepperLabel.textContent =
        position > TOTAL_STEPS
          ? "Completed"
          : `Step ${position} of ${TOTAL_STEPS}`;
    }

    stepperDots.forEach((dot, index) => {
      dot.classList.toggle("is-done", index < position - 1);
      dot.classList.toggle("is-current", index === position - 1);
    });
  };

  /**
   * Shows one step and hides the rest.
   *
   * @param {string} id           id of the step section to show
   * @param {boolean} [moveFocus] move focus to that step's heading
   */
  const goToStep = (id, moveFocus) => {
    const target = steps.find((step) => step.id === id);

    if (!target) {
      return;
    }

    steps.forEach((step) => {
      const section = byId(step.id);

      if (section) {
        section.classList.toggle("is-active", step.id === id);
      }
    });

    updateStepper(target.position);

    if (moveFocus) {
      const heading = document.querySelector(`#${id} .step__title`);

      if (heading) {
        heading.focus();
      }
    }
  };

  /* ----------------------------------------------------------------------
     Validation
     ---------------------------------------------------------------------- */

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /** Shows or clears the error attached to a single input. */
  const setFieldError = (input, errorElement, message) => {
    if (!errorElement) {
      return;
    }

    if (message) {
      errorElement.textContent = message;
      errorElement.hidden = false;
      input.setAttribute("aria-invalid", "true");
    } else {
      errorElement.textContent = "";
      errorElement.hidden = true;
      input.removeAttribute("aria-invalid");
    }
  };

  const validateName = () => {
    const message = nameInput.value.trim() === "" ? "Enter your name." : "";

    setFieldError(nameInput, nameError, message);
    return message === "";
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    let message = "";

    if (value === "") {
      message = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Enter a valid email address, like you@example.com.";
    }

    setFieldError(emailInput, emailError, message);
    return message === "";
  };

  const getSelectedTopics = () =>
    Array.from(
      topicsGroup.querySelectorAll('input[type="checkbox"]:checked'),
      (input) => input.value
    );

  const validateTopics = () => {
    const valid = getSelectedTopics().length > 0;

    if (topicsError) {
      topicsError.textContent = valid ? "" : "Select at least one topic.";
      topicsError.hidden = valid;
    }

    topicsGroup.setAttribute("aria-invalid", valid ? "false" : "true");
    return valid;
  };

  /* ----------------------------------------------------------------------
     Summary
     ---------------------------------------------------------------------- */

  const renderTopics = (topics) => {
    if (!summaryTopics) {
      return;
    }

    summaryTopics.textContent = "";

    topics.forEach((topic) => {
      const item = document.createElement("li");

      item.textContent = topic;
      summaryTopics.appendChild(item);
    });
  };

  /* ----------------------------------------------------------------------
     Reset
     ---------------------------------------------------------------------- */

  const resetForm = () => {
    detailsForm.reset();
    topicsForm.reset();

    setFieldError(nameInput, nameError, "");
    setFieldError(emailInput, emailError, "");

    if (topicsError) {
      topicsError.textContent = "";
      topicsError.hidden = true;
    }

    topicsGroup.setAttribute("aria-invalid", "false");

    if (summaryName) {
      summaryName.textContent = "";
    }

    if (summaryEmail) {
      summaryEmail.textContent = "";
    }

    renderTopics([]);
  };

  /* ----------------------------------------------------------------------
     Wiring
     ---------------------------------------------------------------------- */

  // Step 1 — name and email.
  detailsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Both run before the check so every problem is flagged at once.
    const nameValid = validateName();
    const emailValid = validateEmail();

    if (!nameValid) {
      nameInput.focus();
      return;
    }

    if (!emailValid) {
      emailInput.focus();
      return;
    }

    if (summaryName) {
      summaryName.textContent = nameInput.value.trim();
    }

    if (summaryEmail) {
      summaryEmail.textContent = emailInput.value.trim();
    }

    goToStep("step-topics", true);
  });

  // Once a field has been flagged, correct it as the user types.
  nameInput.addEventListener("input", () => {
    if (nameInput.hasAttribute("aria-invalid")) {
      validateName();
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.hasAttribute("aria-invalid")) {
      validateEmail();
    }
  });

  // Step 2 — topics.
  topicsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateTopics()) {
      const firstCheckbox = topicsGroup.querySelector('input[type="checkbox"]');

      if (firstCheckbox) {
        firstCheckbox.focus();
      }

      return;
    }

    renderTopics(getSelectedTopics());
    goToStep("step-summary", true);
  });

  // Clear the "select at least one" message as soon as one is ticked.
  topicsGroup.addEventListener("change", () => {
    if (topicsGroup.getAttribute("aria-invalid") === "true") {
      validateTopics();
    }
  });

  // Step 3 — confirm.
  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      goToStep("step-done", true);
    });
  }

  // Completion — start over.
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      resetForm();
      goToStep("step-details", true);
    });
  }

  // Back buttons, handled by one delegated listener.
  document.addEventListener("click", (event) => {
    const trigger =
      event.target instanceof Element
        ? event.target.closest("[data-back]")
        : null;

    if (!trigger) {
      return;
    }

    goToStep(trigger.getAttribute("data-back"), true);
  });

  // Start from a known state, in case the browser restored stale field values.
  goToStep("step-details", false);
})();
