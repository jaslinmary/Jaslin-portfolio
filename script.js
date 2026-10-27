/* =========================================================
   JASLIN PORTFOLIO - JAVASCRIPT
   ========================================================= */


/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle = document.getElementById("theme-toggle");


// Dark mode is default
document.body.classList.add("dark");


// Update theme button
function updateThemeButton() {

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";
        themeToggle.title = "Switch to Light Mode";

    } else {

        themeToggle.textContent = "🌙";
        themeToggle.title = "Switch to Dark Mode";

    }
}


// Toggle theme
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    updateThemeButton();

});


// Initial button state
updateThemeButton();



/* =========================
   PROJECT DETAILS MODAL
========================= */

const projectModal = document.getElementById("project-modal");
const detailsButton = document.getElementById("details-btn");
const modalClose = document.getElementById("modal-close");
const modalCloseButton = document.getElementById("modal-close-btn");


// Open modal
function openProjectModal() {

    projectModal.classList.add("show");

    projectModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


// Close modal
function closeProjectModal() {

    projectModal.classList.remove("show");

    projectModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


// Details button
detailsButton.addEventListener("click", openProjectModal);


// X button
modalClose.addEventListener("click", closeProjectModal);


// Bottom close button
modalCloseButton.addEventListener("click", closeProjectModal);


// Click outside modal
projectModal.addEventListener("click", function (event) {

    if (event.target === projectModal) {
        closeProjectModal();
    }

});


// Press Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProjectModal();
    }

});




/* =========================
   CONTACT FORM - FASTAPI
========================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    const originalText = submitButton.innerHTML;

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    if (!formData.name || !formData.email || !formData.message) {
        formStatus.textContent = "Please fill in all the fields.";
        formStatus.style.color = "red";
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";
    formStatus.textContent = "";

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || "Unable to send your message."
            );
        }

        formStatus.textContent =
            "Message sent successfully! Thank you for contacting me.";
        formStatus.style.color = "green";

        contactForm.reset();

    } catch (error) {
        console.error("Contact form error:", error);

        formStatus.textContent =
            "Unable to send your message. Please try again later.";
        formStatus.style.color = "red";

    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }
});


/* =========================
   SWEETHAVEN PROJECT MODAL
========================= */

const sweetHavenModal =
    document.getElementById("sweethaven-modal");

const sweetHavenDetailsButton =
    document.getElementById("sweethaven-details-btn");

const sweetHavenModalClose =
    document.getElementById("sweethaven-modal-close");

const sweetHavenModalCloseButton =
    document.getElementById("sweethaven-modal-close-btn");


// Open SweetHaven modal
function openSweetHavenModal() {
    sweetHavenModal.classList.add("show");
    sweetHavenModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}


// Close SweetHaven modal
function closeSweetHavenModal() {
    sweetHavenModal.classList.remove("show");
    sweetHavenModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}


// Check that the required elements exist
if (sweetHavenModal && sweetHavenDetailsButton) {

    sweetHavenDetailsButton.addEventListener(
        "click",
        openSweetHavenModal
    );

    if (sweetHavenModalClose) {
        sweetHavenModalClose.addEventListener(
            "click",
            closeSweetHavenModal
        );
    }

    if (sweetHavenModalCloseButton) {
        sweetHavenModalCloseButton.addEventListener(
            "click",
            closeSweetHavenModal
        );
    }

    // Close when clicking outside the modal content
    sweetHavenModal.addEventListener("click", function (event) {
        if (event.target === sweetHavenModal) {
            closeSweetHavenModal();
        }
    });

    // Close using Escape
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            sweetHavenModal.classList.contains("show")
        ) {
            closeSweetHavenModal();
        }
    });

} else {
    console.error(
        "SweetHaven modal or Details button is missing from HTML."
    );
}
