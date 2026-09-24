const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      navToggle.focus();
    }
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

// Contact form: opens the reader's email app with the message filled in.
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

// Newsletter: subscribe in place through MailerLite, falling back to the hosted sign-up page.
const SIGNUP_FALLBACK = "https://preview.mailerlite.io/forms/1979694/199376724610254230/share";

document.querySelectorAll("[data-signup-form]").forEach((form) => {
  const status = form.querySelector("[data-signup-status]");
  const button = form.querySelector('button[type="submit"]');
  const email = form.querySelector('input[type="email"]');

  const setStatus = (text, state, withFallback) => {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = state || "";
    if (withFallback) {
      const link = document.createElement("a");
      link.href = SIGNUP_FALLBACK;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Join on the sign-up page instead.";
      status.append(" ", link);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }

    const body = new FormData();
    body.append("fields[email]", email.value.trim());
    body.append("ml-submit", "1");
    body.append("anticsrf", "true");

    button.disabled = true;
    setStatus("Joining…");

    try {
      const response = await fetch(form.action, { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Signup was not accepted");
      form.reset();
      setStatus("You’re on the list. Welcome to the Book Realm.", "ok");
    } catch (error) {
      setStatus("That didn’t go through.", "error", true);
    } finally {
      button.disabled = false;
    }
  });
});
