// ==========================================================================
// INDIA HERITAGE & CULTURE - PART 2 JAVASCRIPT
// Features: Real-Time Digital Clock & Procedural Twinkling Starfield
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  initDigitalClock();
});

// 1. Procedural 50-Star Animated Starfield
function initStarfield() {
  const container = document.getElementById("starfield");
  if (!container) return;

  const starCount = 50;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 3 + 1.5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    star.style.animation = `twinkle ${duration}s infinite`;
    star.style.animationDelay = `${delay}s`;

    // Colors: subtle blend of navy, saffron, and white
    const colors = ["#0B5CAB", "#FF671F", "#138808", "#A8A29E"];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(star);
  }
}

// 2. Real-Time Digital System Clock
function initDigitalClock() {
  const timeElem = document.getElementById("clock-time");
  const dateElem = document.getElementById("clock-date");
  if (!timeElem) return;

  function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock
    const hoursStr = String(hours).padStart(2, "0");

    timeElem.innerHTML = `
      ${hoursStr}<span class="clock-colon">:</span>${minutes}<span class="clock-colon">:</span>${seconds}
      <span class="clock-ampm">${ampm}</span>
    `;

    if (dateElem) {
      const options = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
      dateElem.textContent = now.toLocaleDateString("en-IN", options);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}
