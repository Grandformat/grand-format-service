const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const copyButton = document.querySelector("[data-copy-phone]");
const copyStatus = document.querySelector("[data-copy-status]");
const year = document.querySelector("[data-year]");
const phoneNumber = "89140404";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    }
  });
}

async function copyPhoneNumber() {
  try {
    await navigator.clipboard.writeText(phoneNumber);
    return true;
  } catch {
    const input = document.createElement("input");
    input.value = phoneNumber;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }
}

if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const copied = await copyPhoneNumber();
    copyStatus.textContent = copied ? "Numéro copié." : "Copie impossible. Le numéro est 89140404.";
    window.setTimeout(() => {
      copyStatus.textContent = "";
    }, 2600);
  });
}
