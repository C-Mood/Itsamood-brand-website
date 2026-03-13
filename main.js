const menuBtn = document.querySelector("#menuBtn");
const dropdown = document.querySelector("#dropdown");

menuBtn.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
});

const enterBtn = document.querySelector("#enterBtn");
const intro = document.querySelector("#intro");
const site = document.querySelector("#site");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hero--exit");

  setTimeout(() => {
    intro.style.display = "none";
    site.classList.remove("site--hidden");
    site.classList.add("site--show");
    window.scrollTo(0, 0);
  }, 600);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const items = [...document.querySelectorAll(".carousel .item")];
let active = 0;
let wheelLock = false;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function render() {
  items.forEach((el, i) => {
    const offset = i - active;
    const abs = Math.abs(offset);

    const y = offset * 64;
    const z = -abs * 140;
    const rotX = offset * -18;
    const scale = 1 - abs * 0.12;
    const opacity = Math.max(0, 1 - abs * 0.22);

    el.classList.toggle("is-active", offset === 0);
    el.style.transform = `
      translateX(-50%)
      translateY(${y}px)
      translateZ(${z}px)
      rotateX(${rotX}deg)
      scale(${scale})
    `;
    el.style.opacity = opacity;
    el.style.filter = abs === 0 ? "none" : `blur(${Math.min(3, abs)}px)`;
  });
}

function move(dir) {
  active = clamp(active + dir, 0, items.length - 1);
  render();
}

if (items.length) {
  render();

  window.addEventListener(
    "wheel",
    (e) => {
      if (wheelLock) return;
      wheelLock = true;

      if (e.deltaY > 0) move(1);
      else move(-1);

      setTimeout(() => (wheelLock = false), 140);
    },
    { passive: true }
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") move(1);
    if (e.key === "ArrowUp") move(-1);
  });

  items.forEach((el, idx) =>
    el.addEventListener("click", () => {
      active = idx;
      render();
    })
  );
}

//left to right scroll//

const cards = [...document.querySelectorAll(".coverflow .card")];
let activeCard = 0;
let lock = false;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function renderCoverflow() {
  cards.forEach((card, i) => {
    const offset = i - activeCard; // -2, -1, 0, 1, 2
    const abs = Math.abs(offset);

    const x = offset * 220; // horizontal spacing
    const z = -abs * 180; // depth
    const rotY = offset * -28; // 3D turn
    const scale = 1 - abs * 0.12;
    const opacity = Math.max(0, 1 - abs * 0.25);

    card.classList.toggle("is-active", offset === 0);

    card.style.transform = `
      translate(-50%, -50%)
      translateX(${x}px)
      translateZ(${z}px)
      rotateY(${rotY}deg)
      scale(${scale})
    `;
    card.style.opacity = opacity;
    if (abs === 0) {
      card.style.filter = "none";
    } else {
      card.style.filter = `
    blur(${Math.min(3, abs)}px)
    brightness(${1 - abs * 0.25})
    contrast(${1 - abs * 0.15})
  `;
    }

    card.style.pointerEvents = abs <= 2 ? "auto" : "none";
  });
}

function moveCard(dir) {
  activeCard = clamp(activeCard + dir, 0, cards.length - 1);
  renderCoverflow();
}

if (cards.length) {
  renderCoverflow();

  // Buttons
  document
    .querySelector("#prevBtn")
    ?.addEventListener("click", () => moveCard(-1));
  document
    .querySelector("#nextBtn")
    ?.addEventListener("click", () => moveCard(1));

  // Click a card to focus it (and optionally navigate)
  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      activeCard = idx;
      renderCoverflow();

      // Optional: jump to section
      const link = card.dataset.link;
      if (link)
        document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") moveCard(1);
    if (e.key === "ArrowLeft") moveCard(-1);
  });

  // Wheel (horizontal feel)
  const viewport = document.querySelector(".coverflow-viewport");
  viewport?.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (lock) return;
      lock = true;

      if (e.deltaY > 0 || e.deltaX > 0) moveCard(1);
      else moveCard(-1);

      setTimeout(() => (lock = false), 140);
    },
    { passive: false }
  );
}

const contactForm = document.querySelector(".contact-form");

contactForm?.addEventListener("wheel", (e) => {
  e.stopPropagation();
});
