const themeToggle = document.getElementById("theme-toggle");

// Start website in Dark Mode
document.body.classList.add("dark");
themeToggle.textContent = "☀️";
themeToggle.title = "Switch to Light Mode";

// Toggle Dark / Light Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
        themeToggle.title = "Switch to Light Mode";
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.title = "Switch to Dark Mode";
    }
});