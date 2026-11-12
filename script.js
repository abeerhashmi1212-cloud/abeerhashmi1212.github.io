
// ==========================================
// ABEERVERSE — INTERACTIVE SPACE PORTFOLIO
// ==========================================

// PROJECT INFORMATION
// Edit these descriptions and technologies as your projects develop.

const projects = {
  gripper: {
    number: "MISSION 001",
    name: "End Effector Warehouse Gripper",
    symbol: "⚙",
    description:
      "A mechanical design project focused on developing an end effector for warehouse automation. Explore the design process, mechanical considerations, and the engineering behind the concept.",
    technologies: ["SolidWorks", "Mechanical Design", "Engineering"],
    colour: "#ffad91"
  },

  playbook: {
    number: "MISSION 002",
    name: "PlayBook",
    symbol: "⌘",
    description:
      "A software project involving programming and problem solving. Add your project's purpose, the challenges you encountered, and how you developed your solution here.",
    technologies: ["Programming", "Software", "Problem Solving"],
    colour: "#67baff"
  },

  water: {
    number: "MISSION 003",
    name: "Water Filter",
    symbol: "◉",
    description:
      "An engineering project exploring water filtration. Add details about your design, materials, testing process, and the results of your work here.",
    technologies: ["Engineering Design", "Prototyping", "Testing"],
    colour: "#ff947e"
  }
};

// ==========================================
// INTERACTIVE PROJECT PLANETS
// ==========================================

const projectDetail = document.getElementById("projectDetail");
const projectButtons = document.querySelectorAll("[data-project]");

function showProject(projectId) {
  const project = projects[projectId];

  if (!project) return;

  projectDetail.innerHTML = `
    <div class="detail-content">
      <div>
        <span class="detail-index">${project.number}</span>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="detail-tags">
          ${project.technologies.map(item => `<span>${item}</span>`).join("")}
        </div>
      </div>
      <div class="detail-symbol" style="color: ${project.colour}">
        ${project.symbol}
      </div>
    </div>
  `;

  projectButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.project === projectId
    );
  });
}

projectButtons.forEach(button => {
  button.addEventListener("click", () => {
    showProject(button.dataset.project);

    if (button.classList.contains("project-list-item")) {
      document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ==========================================
// ANIMATED STARFIELD
// ==========================================

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;
let animationFrame;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const starCount = Math.min(
    Math.floor((width * height) / 5500),
    280
  );

  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.25 + 0.2,
    opacity: Math.random() * 0.8 + 0.2,
    change: Math.random() * 0.012 + 0.002,
    direction: Math.random() > 0.5 ? 1 : -1
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  stars.forEach(star => {
    star.opacity += star.change * star.direction;

    if (star.opacity > 1 || star.opacity < 0.15) {
      star.direction *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(220, 225, 255, ${star.opacity})`;
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
});

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
