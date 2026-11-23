// ==========================================================================
// INDIA HERITAGE & CULTURE - FINAL (MASTER ALL-IN-ONE SYSTEM)
// Features: Clock, Twinkling Stars, Interactive Vector Map, & Timeline Carousel
// ==========================================================================

const TIMELINE_EVENTS = [
  {
    date: "c. 2600–1900 BCE",
    title: "Indus Valley Civilisation",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F5286a48e02244c538d8f6e1018ab3f15?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Indus_Valley_civilisation",
    alt: "Archaeological remains of the Indus Valley civilisation site",
  },
  {
    date: "c. 250 BCE",
    title: "Ashoka & Mauryan Edicts",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F573f188e525343a3be3aace28d3fe7e9?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Ashoka",
    alt: "Ashokan pillar, emblem of Mauryan edicts at Sarnath",
  },
  {
    date: "c. 1600–1707",
    title: "Height of Mughal Empire",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F09ce0e4f985a4cb2b9e750fd5c74a862?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Mughal_Empire",
    alt: "Map of the Mughal Empire at its height across the subcontinent",
  },
  {
    date: "1857",
    title: "First War of Independence",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F434cb40e63304135914430e4c149f65f?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Indian_Rebellion_of_1857",
    alt: "1857 First War of Independence engraving scene",
  },
  {
    date: "1919",
    title: "Jallianwala Bagh",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F2e9977eaa26e482aa39168d3a77edc0c?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Jallianwala_Bagh_massacre",
    alt: "Historic depiction of the Jallianwala Bagh massacre",
  },
  {
    date: "1930",
    title: "Dandi March",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F3dcb2adbdee64859bd363ff953b0c003?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Salt_March",
    alt: "Mahatma Gandhi leading the Dandi Salt March, 1930",
  },
  {
    date: "15 Aug 1947",
    title: "Independence of India",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F7f92b9c52b0d4550b448f36427778b54?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Independence_Day_%28India%29",
    alt: "Crowds and national flag on Independence Day, 1947",
  },
  {
    date: "26 Jan 1950",
    title: "Republic of India",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2Fa711caa9507a4acca3f7359920746b61?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Republic_Day_%28India%29",
    alt: "Republic Day celebrations with the national flag, 1950",
  },
  {
    date: "1971",
    title: "Bangladesh Liberation",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2Fb5a538a43cae4702999080abb1a638e7?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Indo-Pakistani_War_of_1971",
    alt: "Supporters during Bangladesh Liberation movement, 1971",
  },
  {
    date: "2014",
    title: "Mars Orbiter Mission",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0c4cdd417b834785b76922d40eb3823b%2F209442dee0f944dc8cb3d4edf3341c93?format=webp&width=800",
    href: "https://en.wikipedia.org/wiki/Mars_Orbiter_Mission",
    alt: "ISRO Mars Orbiter Mission spacecraft model",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  initDigitalClock();
  initInteractiveMap();
  initTimelineCarousel();
});

// 1. Procedural Twinkling Starfield
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

// 3. Interactive SVG India Map
function initInteractiveMap() {
  const statesGroup = document.getElementById("map-states-layer");
  const overlayGroup = document.getElementById("map-overlay-layer");
  if (!statesGroup || !overlayGroup || typeof MAP_SHAPES === "undefined") return;

  const MAP_W = 960;
  const MAP_H = 720;
  const PANEL_W = 260;
  const PANEL_H = 140;

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
    if (s.isCircle) zoomPath.setAttribute("stroke-dasharray", "4 3");
    overlayGroup.appendChild(zoomPath);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", s.cx);
    line.setAttribute("y1", s.cy);
    line.setAttribute("x2", panelX);
    line.setAttribute("y2", anchorY);
    line.setAttribute("stroke", "#0B5CAB");
    line.setAttribute("stroke-width", "1.5");
    line.setAttribute("stroke-dasharray", "3 3");
    overlayGroup.appendChild(line);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", s.cx);
    dot.setAttribute("cy", s.cy);
    dot.setAttribute("r", "3.5");
    dot.setAttribute("fill", "#0B5CAB");
    overlayGroup.appendChild(dot);

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

    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", panelX + 14);
    titleText.setAttribute("y", panelY + 24);
    titleText.setAttribute("font-size", "14");
    titleText.setAttribute("font-weight", "700");
    titleText.setAttribute("fill", "#0B5CAB");
    titleText.textContent = info.name;
    overlayGroup.appendChild(titleText);

    info.notes.slice(0, 3).forEach((n, idx) => {
      const noteText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      noteText.setAttribute("x", panelX + 18);
      noteText.setAttribute("y", panelY + 48 + idx * 20);
      noteText.setAttribute("font-size", "12");
      noteText.setAttribute("fill", "#1a7e0a");
      noteText.textContent = `• ${n}`;
      overlayGroup.appendChild(noteText);
    });

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

// 4. Historical Milestones Timeline Carousel
function initTimelineCarousel() {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const wrapper = document.getElementById("carousel-wrapper");
  if (!track || !prevBtn || !nextBtn) return;

  // Render slides dynamically
  TIMELINE_EVENTS.forEach((item) => {
    const slide = document.createElement("a");
    slide.className = "timeline-slide";
    slide.href = item.href;
    slide.target = "_blank";
    slide.rel = "noreferrer noopener";
    slide.setAttribute("aria-label", `${item.title}, ${item.date}`);

    slide.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" loading="lazy">
      <div class="timeline-overlay"></div>
      <div class="timeline-caption">
        <div class="timeline-date-chip">${item.date}</div>
        <div class="timeline-slide-title">${item.title}</div>
      </div>
    `;

    track.appendChild(slide);
  });

  let currentIndex = 0;
  const totalSlides = TIMELINE_EVENTS.length;
  let autoPlayTimer = null;
  let isHovered = false;

  function getVisibleSlidesCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 1.33;
    return 2;
  }

  function updateCarouselPosition() {
    const visibleCount = getVisibleSlidesCount();
    const maxIndex = Math.max(0, totalSlides - Math.floor(visibleCount));
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    const slideWidthPercent = 100 / visibleCount;
    const offset = currentIndex * slideWidthPercent;
    track.style.transform = `translateX(-${offset}%)`;
  }

  function nextSlide() {
    currentIndex++;
    const visibleCount = getVisibleSlidesCount();
    const maxIndex = Math.max(0, totalSlides - Math.floor(visibleCount));
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    updateCarouselPosition();
  }

  function prevSlide() {
    currentIndex--;
    const visibleCount = getVisibleSlidesCount();
    const maxIndex = Math.max(0, totalSlides - Math.floor(visibleCount));
    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }
    updateCarouselPosition();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Auto-play every 3.5s with pause on hover
  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 3500);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  if (wrapper) {
    wrapper.addEventListener("mouseenter", () => { isHovered = true; });
    wrapper.addEventListener("mouseleave", () => { isHovered = false; });
  }

  window.addEventListener("resize", updateCarouselPosition);
  startAutoPlay();
}
