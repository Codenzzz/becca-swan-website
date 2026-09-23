const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-mailto-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const recipient = form.dataset.to || "";
    const subject = encodeURIComponent(data.get("subject") || "Website message");
    const body = encodeURIComponent(
      `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\n\n${data.get("message") || ""}`,
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});
