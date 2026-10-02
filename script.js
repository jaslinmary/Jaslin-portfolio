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
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        alert("Please fill in all the fields.");

        return;
    }


    /*
       This currently opens the user's email application.
       Replace the email address below if needed.
    */

    const subject = encodeURIComponent(
        `Portfolio Contact from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
    );


    window.location.href =
        `mailto:jaslinmary005@gmail.com?subject=${subject}&body=${body}`;

});