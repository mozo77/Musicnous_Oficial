/*
 * MusicNous Official — configuración del enlace de descarga.
 * Cuando el APK esté publicado, pega la URL REAL de GitHub Releases
 * en GITHUB_RELEASES_URL. No inventes una URL antes de crear el release.
 */
const GITHUB_RELEASES_URL = "";

const downloadButton = document.getElementById("download-button");
const downloadStatus = document.getElementById("download-status");
const launchDate = new Date("2026-10-31T00:00:00-05:00");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");

if (GITHUB_RELEASES_URL.trim()) {
  downloadButton.href = GITHUB_RELEASES_URL;
  downloadButton.textContent = "Descargar APK oficial ↗";
  downloadButton.removeAttribute("aria-describedby");
  // La marca se inserta dentro de un span translate="no" para que Chrome no la traduzca.
  downloadStatus.innerHTML = 'Descarga desde la publicación oficial de <span translate="no">MusicNous</span> en GitHub Releases.';
  downloadButton.classList.remove("is-unavailable");
} else {
  downloadButton.href = "#descarga";
  downloadButton.setAttribute("aria-disabled", "true");
  downloadButton.addEventListener("click", (event) => {
    event.preventDefault();
    downloadStatus.textContent = "El APK todavía no tiene un enlace oficial configurado. Vuelve el día del lanzamiento.";
  });
}

// El mensaje de lanzamiento no cambia la URL de descarga: el enlace solo se activa
// cuando se configura una publicación real.
if (new Date() >= launchDate && !GITHUB_RELEASES_URL.trim()) {
  downloadButton.textContent = "APK próximamente ↗";
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
