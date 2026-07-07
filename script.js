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

/* ==========================================================
   BACKGROUND PARTICLES
========================================================== */

const particleContainer = document.getElementById("particles");

function randomParticle() {
  const p = document.createElement("div");

  p.className = "particle";

  const size = Math.random() * 3 + 1;

  p.style.width = size + "px";

  p.style.height = size + "px";

  p.style.left = Math.random() * 100 + "vw";

  p.style.top = Math.random() * 100 + "vh";

  p.style.opacity = 0;

  particleContainer.appendChild(p);

  const x = (Math.random() - 0.5) * 120;

  const y = (Math.random() - 0.5) * 120;

  const maxOpacity = Math.random() * 0.8 + 0.2;

  p.animate(
    [
      {
        transform: "translate(0,0)",

        opacity: 0,
      },

      {
        transform: `translate(${x / 2}px,${y / 2}px)`,

        opacity: maxOpacity,

        offset: 0.4,
      },

      {
        transform: `translate(${x}px,${y}px)`,

        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 5000 + 4000,

      easing: "ease-in-out",
    },
  );

  setTimeout(() => {
    p.remove();
  }, 9000);
}

setInterval(() => {
  if (document.querySelectorAll(".particle").length < 120) {
    randomParticle();
  }
}, 120);

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
