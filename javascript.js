const card = document.querySelector("#card");
const message = document.querySelector("#message");
const revealBtn = document.querySelector("#revealBtn");
const celebrateBtn = document.querySelector("#celebrateBtn");
const themeToggle = document.querySelector("#themeToggle");
const resetBtn = document.querySelector("#resetBtn");
const effects = document.querySelector("#effects");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Reveal or hide the message
if (revealBtn && message) {
  revealBtn.addEventListener("click", () => {
    const isHidden = message.classList.contains("message-hidden");

    if (isHidden) {
      message.classList.remove("message-hidden");
      message.classList.add("message-visible");
      revealBtn.textContent = "Hide My Message";
      revealBtn.setAttribute("aria-expanded", "true");
    } else {
      message.classList.remove("message-visible");
      message.classList.add("message-hidden");
      revealBtn.textContent = "Reveal My Message";
      revealBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Calm visual variation
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("calm-mode", themeToggle.checked);
  });
}

// Celebration effect
if (celebrateBtn) {
  celebrateBtn.addEventListener("click", () => {
    if (reduceMotion) {
      return;
    }

    createConfetti();
    createStars();

    celebrateBtn.textContent = "Celebration Sent!";

    setTimeout(() => {
      celebrateBtn.textContent = "Celebrate";
    }, 1800);
  });
}

function createConfetti() {
  const colors = ["#d9a441", "#102a43", "#4d86a8", "#f5d98b", "#ffffff"];

  for (let i = 0; i < 32; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.style.left = `${50 + randomNumber(-12, 12)}%`;
    piece.style.top = "45%";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty("--x", `${randomNumber(-260, 260)}px`);
    piece.style.setProperty("--y", `${randomNumber(180, 480)}px`);
    piece.style.transform = `rotate(${randomNumber(0, 360)}deg)`;

    effects.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 1900);
  }
}

function createStars() {
  const symbols = ["✦", "✧", "★", "✶"];

  for (let i = 0; i < 12; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    star.style.left = `${randomNumber(20, 80)}%`;
    star.style.top = `${randomNumber(25, 65)}%`;
    star.style.setProperty("--x", `${randomNumber(-180, 180)}px`);
    star.style.setProperty("--y", `${randomNumber(-180, 180)}px`);

    effects.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 1400);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Reset the card to its original state
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (message) {
      message.classList.remove("message-visible");
      message.classList.add("message-hidden");
    }

    if (revealBtn) {
      revealBtn.textContent = "Reveal My Message";
      revealBtn.setAttribute("aria-expanded", "false");
    }

    if (themeToggle) {
      themeToggle.checked = false;
    }

    document.body.classList.remove("calm-mode");
  });
}

