const music = document.getElementById("bgMusic");

const landing = document.getElementById("landing");

const cardSection = document.getElementById("cardSection");

const guestInput = document.getElementById("guestName");

const guestDisplay = document.getElementById("guestDisplay");

const openBtn = document.getElementById("openCard");

const flowerSection = document.querySelector(".flower-section");

const vinyl = document.querySelector(".vinyl");

const beam = document.getElementById("lightBeam");

/* ==========================================================
   BACKGROUND PARTICLES
========================================================== */

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 90; i++) {
  const p = document.createElement("div");

  p.className = "particle";

  const size = Math.random() * 3 + 2;

  p.style.width = size + "px";

  p.style.height = size + "px";

  p.style.left = Math.random() * 100 + "vw";

  p.style.top = Math.random() * 100 + "vh";

  p.style.opacity = Math.random() * 0.8 + 0.2;

  p.style.animationDuration = Math.random() * 15 + 12 + "s";

  p.style.animationDelay = Math.random() * 6 + "s";

  particleContainer.appendChild(p);
}

/* ==========================================================
   MUSIC
========================================================== */

function startMusic() {
  music.volume = 0;

  music.play().catch(() => {});

  let volume = 0;

  const fade = setInterval(() => {
    volume += 0.01;

    if (volume >= 0.35) {
      volume = 0.35;

      clearInterval(fade);
    }

    music.volume = volume;
  }, 70);
}

/* ==========================================================
   VINYL PLAY / PAUSE
========================================================== */

vinyl.addEventListener("click", () => {
  if (music.paused) {
    music.play();

    vinyl.style.animationPlayState = "running";
  } else {
    music.pause();

    vinyl.style.animationPlayState = "paused";
  }
});

/* ==========================================================
   TYPE WRITER
========================================================== */

function typeName(name) {
  guestDisplay.innerHTML = "";

  let i = 0;

  const text = name.toUpperCase();

  const typing = setInterval(() => {
    guestDisplay.innerHTML += text.charAt(i);

    i++;

    if (i >= text.length) {
      clearInterval(typing);
    }
  }, 90);
}

/* ==========================================================
   STAR EXPLOSION
========================================================== */

function explodeStar() {
  openBtn.animate(
    [
      {
        transform: "scale(1)",

        opacity: 1,

        filter: "drop-shadow(0 0 0 gold)",
      },

      {
        transform: "scale(1.8)",

        filter: "drop-shadow(0 0 80px gold)",
      },

      {
        transform: "scale(.2)",

        opacity: 0,
      },
    ],
    {
      duration: 850,

      fill: "forwards",
    },
  );
}

/* ==========================================================
   CONFETTI
========================================================== */

function launchConfetti() {
  confetti({
    particleCount: 260,

    spread: 180,

    startVelocity: 55,

    gravity: 0.9,

    scalar: 1.1,

    ticks: 320,

    origin: {
      x: 0.5,

      y: 0.58,
    },

    colors: ["#ffffff", "#ffe066", "#9ddcff", "#d4af37"],
  });
}

/* ==========================================================
   SHOOTING STARS
========================================================== */

function shootingStar() {
  confetti({
    particleCount: 1,

    angle: 90,

    spread: 10,

    startVelocity: 10,

    gravity: 0.15,

    scalar: 1,

    drift: (Math.random() - 0.5) * 4,

    ticks: 1500,

    colors: ["#ffffff", "#ffe066"],

    origin: {
      x: Math.random(),

      y: -0.05,
    },
  });
}

setInterval(shootingStar, 350);

/* ==========================================================
   OPEN INVITATION
========================================================== */

openBtn.addEventListener("click", () => {
  let guest = guestInput.value.trim();

  if (guest === "") {
    guest = "Bạn";
  }

  explodeStar();

  startMusic();

  launchConfetti();

  beam.classList.add("show");

  landing.classList.add("hide");

  setTimeout(() => {
    landing.style.display = "none";

    cardSection.classList.add("show");
  }, 900);

  setTimeout(() => {
    typeName(guest);
  }, 1700);

  setTimeout(() => {
    flowerSection.classList.add("show");
  }, 2400);
});

/* ==========================================================
   ENTER KEY
========================================================== */

guestInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    openBtn.click();
  }
});

/* ==========================================================
   PARALLAX
========================================================== */

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  document.body.style.backgroundPosition = `center ${y * 0.25}px`;
});
