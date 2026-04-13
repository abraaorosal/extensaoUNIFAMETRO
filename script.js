const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const faqButtons = document.querySelectorAll(".faq-question");

// Atualize este seletor caso adicione novas seções ao menu principal.
const observedSections = Array.from(navAnchors)
  .map((anchor) => document.querySelector(anchor.getAttribute("href")))
  .filter(Boolean);

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    faqButtons.forEach((item) => item.setAttribute("aria-expanded", "false"));
    button.setAttribute("aria-expanded", String(!isExpanded));
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navAnchors.forEach((anchor) => {
          const isActive =
            anchor.getAttribute("href") === `#${entry.target.id}`;
          anchor.classList.toggle("active", isActive);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  observedSections.forEach((section) => observer.observe(section));
}

// Troque os links de WhatsApp no HTML se o grupo geral for alterado.
