// --- STATE & LOCALSTORAGE SETUP (Default to Dark Mode) ---
const htmlEl = document.documentElement;
let currentLang = localStorage.getItem("sky_lang") || "id";
let currentTheme = localStorage.getItem("sky_theme") || "dark"; // Default dark

// Apply initial settings
htmlEl.setAttribute("data-theme", currentTheme);
updateLanguageUI();

// --- THEME TOGGLE ---
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", currentTheme);
  localStorage.setItem("sky_theme", currentTheme);
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
});
if (themeToggle) {
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

// --- LANGUAGE TOGGLE ---
const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");

langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "id" ? "en" : "id";
  localStorage.setItem("sky_lang", currentLang);
  updateLanguageUI();
});

function updateLanguageUI() {
  if (langLabel) langLabel.textContent = currentLang === "id" ? "EN" : "ID";
  
  // Translate elements with data-id / data-en
  document.querySelectorAll("[data-id][data-en]").forEach(el => {
    el.innerHTML = el.getAttribute(`data-${currentLang}`);
  });

  // Translate placeholders
  document.querySelectorAll("[data-placeholder-id][data-placeholder-en]").forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${currentLang}`);
  });
}

// --- SEARCH & FILTER LOGIC ---
const searchInput = document.getElementById("gameSearch");
const cards = [...document.querySelectorAll(".game-card")];
const chips = [...document.querySelectorAll(".chip")];
const emptyState = document.getElementById("emptyState");
let activeCategory = "Semua";

function filterGames() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchName = card.dataset.name.toLowerCase().includes(query);
    const matchCategory = activeCategory === "Semua" || card.dataset.category === activeCategory;
    const show = matchName && matchCategory;
    card.hidden = !show;
    if (show) visible++;
  });
  if (emptyState) emptyState.hidden = visible !== 0;
}

searchInput?.addEventListener("input", filterGames);

chips.forEach(chip => chip.addEventListener("click", () => {
  activeCategory = chip.dataset.category;
  chips.forEach(item => item.classList.toggle("active", item === chip));
  filterGames();
}));

// --- MOBILE MENU ---
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded","false");
  if (menuToggle) menuToggle.textContent = "☰";
}));

// --- WHATSAPP REDIRECT ---
cards.forEach(card => card.addEventListener("click", () => {
  const game = card.dataset.name;
  const message = currentLang === "en" 
    ? `Hello SkyGaming admin, I want to ask about top up for ${game}.`
    : `Halo admin SkyGaming, saya ingin bertanya tentang top up ${game}.`;
  window.open(`https://wa.me/6287716630959?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}));
