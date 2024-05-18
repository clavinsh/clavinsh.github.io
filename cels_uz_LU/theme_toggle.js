const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll(".shape").forEach((shape) => {
        shape.classList.toggle("dark-mode");
    });
    document.querySelectorAll("nav ul li a").forEach((link) => {
        link.classList.toggle("dark-mode");
    });
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelector("footer").classList.toggle("dark-mode");
    modeToggle.classList.toggle("dark-mode");
    document.querySelector(".day-button").classList.toggle("dark-mode");
});
