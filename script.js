
// ==========================================
// ABEERVERSE — INTERACTIONS
// ==========================================

const projects = {
  gripper: {
    number: "MISSION 001",
    name: "End Effector Warehouse Gripper",
    description:
      "A mechanical design project focused on developing an end effector for warehouse automation. Explore the design process, mechanical considerations, and engineering behind the concept.",
    technologies: ["SolidWorks", "Mechanical Design", "Engineering"]
  },

  playbook: {
    number: "MISSION 002",
    name: "PlayBook",
    description:
      "A software project involving programming and problem solving. Add the project's purpose, challenges, and the way you developed your solution here.",
    technologies: ["Programming", "Software", "Problem Solving"]
  },

  water: {
    number: "MISSION 003",
    name: "Water Filter",
    description:
      "An engineering project exploring water filtration. Add details about your design, materials, testing process, and the results of your work here.",
    technologies: ["Engineering Design", "Prototyping", "Testing"]
  }
};

// ==========================================
// PLANET HOVER PREVIEW
// ==========================================

const solarSystem = document.querySelector(".solar-system");
const preview = document.getElementById("planetPreview");
const previewTitle = document.getElementById("previewTitle");
const previewDescription = document.getElementById("previewDescription");
const previewTags = document.getElementById("previewTags");

const planets = document.querySelectorAll(".planet[data-project]");
const projectLinks = document.querySelectorAll(".project-list-item[data-project]");

let pinnedProject = null;
let activePlanet = null;

function showPreview(projectId, planet) {
  const project = projects[projectId];
  if (!project || !planet) return;

  previewTitle.textContent = project.name;
  previewDescription.textContent = project.description;

  previewTags.innerHTML = "";
  project.technologies.forEach(technology => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    previewTags.appendChild(tag);
  });

  // Position the preview near the selected planet.
  const systemRect = solarSystem.getBoundingClientRect();
  const planetRect = planet.getBoundingClientRect();

  const centerX = planetRect.left - systemRect.left + planetRect.width / 2;
  const centerY = planetRect.top - systemRect.top + planetRect.height / 2;

  const previewWidth = Math.min(260, solarSystem.clientWidth - 20);

  let left = centerX + 35;
  let top = centerY - 65;

  if (left + previewWidth > solarSystem.clientWidth) {
    left = centerX - previewWidth - 35;
  }

  left = Math.max(10, Math.min(left, solarSystem.clientWidth - previewWidth - 10));
  top = Math.max(10, Math.min(top, solarSystem.clientHeight - 190));

  preview.style.left = `${left}px`;
  preview.style.top = `${top}px`;

  preview.classList.add("visible");
  solarSystem.classList.add("paused");

  planets.forEach(item => {
    item.classList.toggle("active", item === planet);
  });

  activePlanet = planet;
}

function hidePreview() {
  if (pinnedProject) return;

  preview.classList.remove("visible");
  solarSystem.classList.remove("paused");

  planets.forEach(planet => planet.classList.remove("active"));
  activePlanet = null;
}

planets.forEach(planet => {
  const projectId = planet.dataset.project;

  planet.addEventListener("pointerenter", () => {
    if (pinnedProject) return;
    showPreview(projectId, planet);
  });

  planet.addEventListener("pointerleave", event => {
    if (event.pointerType === "touch") return;
    if (!pinnedProject) hidePreview();
  });

  planet.addEventListener("focus", () => {
    if (!pinnedProject) showPreview(projectId, planet);
  });

  planet.addEventListener("blur", () => {
    if (!pinnedProject) hidePreview();
  });

  planet.addEventListener("click", () => {
    if (pinnedProject === projectId) {
      pinnedProject = null;
      hidePreview();
    } else {
      pinnedProject = projectId;
      showPreview(projectId, planet);
    }
  });
});

// Clicking elsewhere in the solar system closes a pinned preview.
solarSystem.addEventListener("click", event => {
  if (event.target.closest(".planet")) return;

  pinnedProject = null;
  hidePreview();
});

// Project list below the solar system.
projectLinks.forEach(button => {
  button.addEventListener("click", () => {
    const projectId = button.dataset.project;
    const planet = document.querySelector(
      `.planet[data-project="${projectId}"]`
    );

    if (planet) {
      pinnedProject = projectId;
      showPreview(projectId, planet);
    }
  });
});

// ==========================================
// STARFIELD
// ==========================================

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;
let animationFrame;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(Math.floor(width * height / 5500), 280);

  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.1 + 0.2,
    opacity: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.004 + 0.001,
    direction: Math.random() > 0.5 ? 1 : -1
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  stars.forEach(star => {
    star.opacity += star.speed * star.direction;

    if (star.opacity > 0.85 || star.opacity < 0.12) {
      star.direction *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(205, 200, 190, ${star.opacity})`;
    ctx.fill();
  });

  animationFrame = requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawStars();

  if (activePlanet && pinnedProject) {
    showPreview(pinnedProject, activePlanet);
  }
});

// ==========================================
// SCROLL REVEALS
// ==========================================

const revealElements = document.querySelectorAll(
  ".section-heading, .timeline-item, .skill-card, .about-layout, .project-list-item, .project-detail"
);

revealElements.forEach(element => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -45px 0px"
});

revealElements.forEach(element => observer.observe(element));

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});
