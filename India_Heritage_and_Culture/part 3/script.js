// ==========================================================================
// INDIA HERITAGE & CULTURE - PART 3 JAVASCRIPT
// Features: Interactive SVG Map with Hover Cards & Tourism Portals
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  initDigitalClock();
  initInteractiveMap();
});

// 1. Procedural 50-Star Animated Starfield
function initStarfield() {
  const container = document.getElementById("starfield");
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + 1.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
    star.style.animationDelay = `${Math.random() * 2}s`;
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
    hours = hours % 12 || 12;
    const hoursStr = String(hours).padStart(2, "0");

    timeElem.innerHTML = `
      ${hoursStr}<span class="clock-colon">:</span>${minutes}<span class="clock-colon">:</span>${seconds}
      <span class="clock-ampm">${ampm}</span>
    `;

    if (dateElem) {
      dateElem.textContent = now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// 3. Interactive SVG Map
function initInteractiveMap() {
  const statesGroup = document.getElementById("map-states-layer");
  const overlayGroup = document.getElementById("map-overlay-layer");
  if (!statesGroup || !overlayGroup || typeof MAP_SHAPES === "undefined") return;

  const MAP_W = 960;
  const MAP_H = 720;
  const PANEL_W = 260;
  const PANEL_H = 140;

  // Render all state paths
  MAP_SHAPES.forEach((s) => {
    const info = STATE_INFO[s.key] || {
      name: s.name,
      tourismUrl: `https://www.google.com/search?q=${encodeURIComponent(s.name + " tourism heritage")}`,
      notes: [
        "Historic landmarks and traditions",
        "Local arts, crafts and cuisine",
        "Festivals and cultural events",
      ],
    };

    const link = document.createElementNS("http://www.w3.org/2000/svg", "a");
    link.setAttribute("href", info.tourismUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("aria-label", `View heritage of ${info.name}`);

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "state-shape");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "link");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", s.d);
    path.setAttribute("fill", s.color);

    g.appendChild(path);
    link.appendChild(g);
    statesGroup.appendChild(link);

    // Hover events
    g.addEventListener("mouseenter", () => showHoverPanel(s, info));
    g.addEventListener("focus", () => showHoverPanel(s, info));
    g.addEventListener("mouseleave", hideHoverPanel);
    g.addEventListener("blur", hideHoverPanel);
  });

  function showHoverPanel(s, info) {
    overlayGroup.innerHTML = "";

    const panelX = MAP_W - PANEL_W - 12;
    const panelY = Math.min(Math.max(12, s.cy - PANEL_H / 2), MAP_H - PANEL_H - 12);
    const anchorY = Math.min(Math.max(panelY + 16, s.cy), panelY + PANEL_H - 16);

    // Zoomed state highlight overlay
    const zoomPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    zoomPath.setAttribute("d", s.d);
    zoomPath.setAttribute("fill", s.color);
    zoomPath.setAttribute("stroke", "#0B5CAB");
    zoomPath.setAttribute("stroke-width", "2.2");
    zoomPath.setAttribute("filter", "url(#dropShadow)");
    zoomPath.setAttribute(
      "transform",
      `translate(${s.cx},${s.cy}) scale(1.12) translate(${-s.cx},${-s.cy})`
    );
    if (s.isCircle) {
      zoomPath.setAttribute("stroke-dasharray", "4 3");
    }
    overlayGroup.appendChild(zoomPath);

    // Animated dashed leader line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", s.cx);
    line.setAttribute("y1", s.cy);
    line.setAttribute("x2", panelX);
    line.setAttribute("y2", anchorY);
    line.setAttribute("stroke", "#0B5CAB");
    line.setAttribute("stroke-width", "1.5");
    line.setAttribute("stroke-dasharray", "3 3");
    overlayGroup.appendChild(line);

    // Dot at centroid
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", s.cx);
    dot.setAttribute("cy", s.cy);
    dot.setAttribute("r", "3.5");
    dot.setAttribute("fill", "#0B5CAB");
    overlayGroup.appendChild(dot);

    // Card background rect
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", panelX);
    rect.setAttribute("y", panelY);
    rect.setAttribute("width", PANEL_W);
    rect.setAttribute("height", PANEL_H);
    rect.setAttribute("rx", "10");
    rect.setAttribute("fill", "#ffffff");
    rect.setAttribute("opacity", "0.96");
    rect.setAttribute("stroke", "#cfe1ff");
    rect.setAttribute("stroke-width", "1.5");
    overlayGroup.appendChild(rect);

    // Card Title
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", panelX + 14);
    titleText.setAttribute("y", panelY + 24);
    titleText.setAttribute("font-size", "14");
    titleText.setAttribute("font-weight", "700");
    titleText.setAttribute("fill", "#0B5CAB");
    titleText.textContent = info.name;
    overlayGroup.appendChild(titleText);

    // Curated Notes
    info.notes.slice(0, 3).forEach((n, idx) => {
      const noteText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      noteText.setAttribute("x", panelX + 18);
      noteText.setAttribute("y", panelY + 48 + idx * 20);
      noteText.setAttribute("font-size", "12");
      noteText.setAttribute("fill", "#1a7e0a");
      noteText.textContent = `• ${n}`;
      overlayGroup.appendChild(noteText);
    });

    // Action CTA text
    const ctaText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    ctaText.setAttribute("x", panelX + 14);
    ctaText.setAttribute("y", panelY + PANEL_H - 12);
    ctaText.setAttribute("font-size", "11");
    ctaText.setAttribute("font-weight", "600");
    ctaText.setAttribute("fill", "#FF671F");
    ctaText.textContent = "Click to open official tourism site →";
    overlayGroup.appendChild(ctaText);
  }

  function hideHoverPanel() {
    overlayGroup.innerHTML = "";
  }
}
