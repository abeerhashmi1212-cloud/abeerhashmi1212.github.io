
/* =========================================
   EDIT YOUR PORTFOLIO CONTENT HERE
   ========================================= */

const portfolio = {
  skills: [
    {
      title: "Programming Languages",
      items: ["Python", "C#", "C++", "JavaScript", "MATLAB"]
    },
    {
      title: "CAD & Engineering Design",
      items: ["SolidWorks", "Autodesk Inventor", "CAD", "3D Modelling"]
    },
    {
      title: "Hardware & Electronics",
      items: ["Arduino", "Soldering", "Circuit Design", "Prototyping"]
    },
    {
      title: "Tools & Other",
      items: ["Git", "Problem Solving", "Technical Writing", "Teamwork"]
    }
  ],

  projects: [
    {
      title: "[PROJECT ONE TITLE]",
      type: "HARDWARE",
      description: "[Write a short description of this project and what you built.]",
      tags: ["[Technology]", "[Tool]", "[Skill]"],
      link: "",
      planet: "a"
    },
    {
      title: "[PROJECT TWO TITLE]",
      type: "SOFTWARE",
      description: "[Explain what the software does and what your contribution was.]",
      tags: ["[Language]", "[Framework]", "[Tool]"],
      link: "",
      planet: "b"
    },
    {
      title: "[PROJECT THREE TITLE]",
      type: "MECHANICAL",
      description: "[Describe the engineering problem, your design, and the outcome.]",
      tags: ["[CAD]", "[Design]", "[Testing]"],
      link: "",
      planet: "c"
    },
    {
      title: "[PROJECT FOUR TITLE]",
      type: "DESIGN & RESEARCH",
      description: "[Describe the research, design process, or experiment.]",
      tags: ["[Research]", "[Analysis]", "[Engineering]"],
      link: "",
      planet: "d"
    }
  ],

  experience: [
    {
      role: "[YOUR POSITION / ROLE]",
      organization: "[ORGANIZATION OR CLUB]",
      date: "[START DATE — END DATE]",
      hash: "a1b2c3d",
      description: "[Describe your responsibilities and what you worked on.]",
      bullets: [
        "[Achievement or responsibility one]",
        "[Achievement or responsibility two]"
      ]
    },
    {
      role: "[YOUR POSITION / ROLE]",
      organization: "[ORGANIZATION OR CLUB]",
      date: "[START DATE — END DATE]",
      hash: "e4f5g6h",
      description: "[Add a short description of your experience.]",
      bullets: [
        "[Achievement or responsibility one]",
        "[Achievement or responsibility two]"
      ]
    },
    {
      role: "[YOUR POSITION / ROLE]",
      organization: "[ORGANIZATION OR CLUB]",
      date: "[START DATE — END DATE]",
      hash: "i7j8k9l",
      description: "[Add another experience here.]",
      bullets: []
    }
  ],

  education: [
    {
      role: "[YOUR DEGREE]",
      organization: "[UNIVERSITY NAME]",
      date: "[START DATE — EXPECTED GRADUATION]",
      hash: "edu001",
      description: "[Describe your program, academic interests, and relevant coursework.]",
      bullets: [
        "[Relevant coursework]",
        "[Scholarships, awards, or achievements — if applicable]"
      ]
    },
    {
      role: "[PREVIOUS EDUCATION]",
      organization: "[SCHOOL NAME]",
      date: "[START DATE — END DATE]",
      hash: "edu002",
      description: "[Add a short description of your previous education.]",
      bullets: []
    }
  ],

  email: "YOUR_EMAIL@example.com"
};


/* =========================================
   SKILLS CAROUSEL
   ========================================= */

let skillIndex = 0;

const skillTitle = document.getElementById("skillTitle");
const skillList = document.getElementById("skillList");
const skillCount = document.getElementById("skillCount");
const skillProgress = document.getElementById("skillProgress");

function renderSkills() {
  const skill = portfolio.skills[skillIndex];

  skillTitle.textContent = skill.title;
  skillCount.textContent =
    `${String(skillIndex + 1).padStart(2, "0")} / ${String(portfolio.skills.length).padStart(2, "0")}`;

  skillList.innerHTML = "";

  skill.items.forEach(item => {
    const tag = document.createElement("span");
    tag.textContent = item;
    skillList.appendChild(tag);
  });

  skillProgress.innerHTML = "";
  const bar = document.createElement("span");
  bar.style.width = `${((skillIndex + 1) / portfolio.skills.length) * 100}%`;
  skillProgress.appendChild(bar);
}

function changeSkill(direction) {
  skillIndex = (skillIndex + direction + portfolio.skills.length)
    % portfolio.skills.length;
  renderSkills();
}

document.getElementById("skillPrev").addEventListener("click", () => changeSkill(-1));
document.getElementById("skillNext").addEventListener("click", () => changeSkill(1));

renderSkills();


/* =========================================
   PROJECT DIRECTORY
   ========================================= */

const projectList = document.getElementById("projectList");
const projectTotal = document.getElementById("projectTotal");

projectTotal.textContent =
  `${String(portfolio.projects.length).padStart(2, "0")} PROJECTS`;

portfolio.projects.forEach((project, index) => {
  const button = document.createElement("button");
  button.className = "project-row";
  button.dataset.project = index;

  button.innerHTML = `
    <span class="pr-number">PRJ.${String(index + 1).padStart(2, "0")}</span>
    <span class="pr-name"></span>
    <span class="pr-type"></span>
    <span class="pr-arrow">↗</span>
  `;

  button.querySelector(".pr-name").textContent = project.title;
  button.querySelector(".pr-type").textContent = project.type;

  button.addEventListener("click", () => {
    openProject(index, null, true);
  });

  projectList.appendChild(button);
});


/* =========================================
   ORBITING PROJECTS
   ========================================= */

const orbitSystem = document.getElementById("orbitSystem");
const tooltip = document.getElementById("projectTooltip");

const tooltipIndex = document.getElementById("tooltipIndex");
const tooltipTitle = document.getElementById("tooltipTitle");
const tooltipDescription = document.getElementById("tooltipDescription");
const tooltipTags = document.getElementById("tooltipTags");

const planets = document.querySelectorAll(".project-planet");
const projectRows = document.querySelectorAll(".project-row");

let pinnedProject = null;
let currentProject = null;

function openProject(index, planet = null, pin = false) {
  const project = portfolio.projects[index];
  if (!project) return;

  currentProject = index;

  if (pin) pinnedProject = index;

  tooltipIndex.textContent =
    `PROJECT ${String(index + 1).padStart(2, "0")} / ${project.type}`;

  tooltipTitle.textContent = project.title;
  tooltipDescription.textContent = project.description;

  tooltipTags.innerHTML = "";

  project.tags.forEach(tagText => {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    tooltipTags.appendChild(tag);
  });

  if (project.link) {
    const link = document.createElement("a");
    link.href = project.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "VIEW PROJECT ↗";
    link.className = "tooltip-link";
    link.style.cssText =
      "display:inline-block;margin-top:12px;color:#b7aa91;font:10px monospace;";
    tooltipTags.appendChild(link);
  }

  tooltip.classList.add("visible");
  orbitSystem.classList.add("paused");

  planets.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  projectRows.forEach((item, i) => {
    item.classList.toggle("selected", i === index);
  });

  if (planet && window.innerWidth > 760) {
    const rect = planet.getBoundingClientRect();
    const systemRect = orbitSystem.getBoundingClientRect();

    const x = rect.left - systemRect.left + rect.width / 2;
    const y = rect.top - systemRect.top + rect.height / 2;

    let left = x + 45;
    let top = y - 65;

    if (left + 235 > orbitSystem.clientWidth) {
      left = x - 260;
    }

    left = Math.max(8, Math.min(left, orbitSystem.clientWidth - 243));
    top = Math.max(8, Math.min(top, orbitSystem.clientHeight - 175));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.bottom = "auto";
    tooltip.style.transform = "";
  }
}

function closeProject() {
  if (pinnedProject !== null) return;

  tooltip.classList.remove("visible");
  orbitSystem.classList.remove("paused");
  planets.forEach(planet => planet.classList.remove("active"));
  projectRows.forEach(row => row.classList.remove("selected"));
  currentProject = null;
}

planets.forEach((planet, index) => {
  planet.addEventListener("pointerenter", event => {
    if (pinnedProject !== null || event.pointerType === "touch") return;
    openProject(index, planet);
  });

  planet.addEventListener("pointerleave", event => {
    if (event.pointerType === "touch") return;
    closeProject();
  });

  planet.addEventListener("focus", () => {
    if (pinnedProject === null) openProject(index, planet);
  });

  planet.addEventListener("blur", closeProject);

  planet.addEventListener("click", () => {
    if (pinnedProject === index) {
      pinnedProject = null;
      closeProject();
    } else {
      pinnedProject = index;
      openProject(index, planet, true);
    }
  });
});

orbitSystem.addEventListener("click", event => {
  if (event.target.closest(".project-planet")) return;

  pinnedProject = null;
  closeProject();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    pinnedProject = null;
    closeProject();
  }
});


/* =========================================
   EXPERIENCE AND EDUCATION TIMELINES
   ========================================= */

function renderTimeline(items, containerId) {
  const container = document.getElementById(containerId);

  items.forEach(item => {
    const entry = document.createElement("article");
    entry.className = "timeline-entry reveal";

    const date = document.createElement("div");
    date.innerHTML = `
      <div class="timeline-date"></div>
      <div class="timeline-hash"></div>
    `;
    date.querySelector(".timeline-date").textContent = item.date;
    date.querySelector(".timeline-hash").textContent = `commit ${item.hash}`;

    const body = document.createElement("div");
    body.className = "timeline-body";

    const title = document.createElement("h3");
    title.textContent = item.role;

    const organization = document.createElement("div");
    organization.className = "timeline-org";
    organization.textContent = item.organization;

    const description = document.createElement("p");
    description.textContent = item.description;

    body.append(title, organization, description);

    if (item.bullets.length) {
      const list = document.createElement("ul");

      item.bullets.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        list.appendChild(li);
      });

      body.appendChild(list);
    }

    entry.append(date, body);
    container.appendChild(entry);
  });
}

renderTimeline(portfolio.experience, "experienceList");
renderTimeline(portfolio.education, "educationList");


/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, .about-grid, .skills-terminal, " +
  ".project-universe, .project-directory, .timeline-entry, " +
  ".contact-copy, .contact-terminal, .contact-links"
);

revealElements.forEach(element => element.classList.add("reveal"));

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -35px 0px"
});

revealElements.forEach(element => observer.observe(element));


/* =========================================
   NAVIGATION
   ========================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navigation.classList.remove("open"));
});


/* =========================================
   ORBIT PROGRESS INDICATOR
   ========================================= */

window.addEventListener("scroll", () => {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = maxScroll > 0
    ? Math.round((window.scrollY / maxScroll) * 100)
    : 0;

  document.getElementById("orbitPercent").textContent =
    String(progress).padStart(3, "0");
});


/* =========================================
   CONTACT / COPY EMAIL
   ========================================= */

const emailLink = document.getElementById("emailLink");
emailLink.textContent = portfolio.email;
emailLink.href = `mailto:${portfolio.email}`;

document.getElementById("copyEmail").addEventListener("click", async () => {
  const button = document.getElementById("copyEmail");

  try {
    await navigator.clipboard.writeText(portfolio.email);
    button.textContent = "Copied ✓";
  } catch {
    button.textContent = portfolio.email;
  }

  setTimeout(() => button.textContent = "Copy email ↗", 1800);
});


/* =========================================
   HIDDEN TERMINAL
   Press / to open, Escape to close
   ========================================= */

const shell = document.getElementById("shellOverlay");
const shellInput = document.getElementById("shellInput");
const shellOutput = document.getElementById("shellOutput");

function openShell() {
  shell.classList.add("open");
  shell.setAttribute("aria-hidden", "false");
  shellInput.focus();
}

function closeShell() {
  shell.classList.remove("open");
  shell.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", event => {
  const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);

  if (event.key === "/" && !typing) {
    event.preventDefault();
    openShell();
  }

  if (event.key === "Escape") closeShell();
});

document.getElementById("closeShell").addEventListener("click", closeShell);

function printShell(text) {
  const line = document.createElement("p");
  line.textContent = text;
  shellOutput.appendChild(line);
  shellOutput.scrollTop = shellOutput.scrollHeight;
}

document.getElementById("shellForm").addEventListener("submit", event => {
  event.preventDefault();

  const command = shellInput.value.trim().toLowerCase();
  if (!command) return;

  printShell(`visitor@portfolio ~ % ${command}`);

  const commands = {
    help: "Commands: help, about, projects, skills, contact, clear, date, game",
    about: "This portfolio belongs to [YOUR NAME]. Add your own introduction in index.html.",
    projects: portfolio.projects.map((p, i) => `${i + 1}. ${p.title}`).join(" | "),
    skills: portfolio.skills.map(s => s.title).join(" | "),
    contact: portfolio.email,
    date: new Date().toDateString(),
    game: "Scroll to the bottom of the page to find the mini game.",
    clear: ""
  };

  if (command === "clear") {
    shellOutput.innerHTML = "";
  } else {
    printShell(commands[command] || `Command not found: ${command}`);
  }

  shellInput.value = "";
});


/* =========================================
   MINI SPACE GAME
   Move with arrows, shoot with space
   ========================================= */

const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");
const gamePanel = document.getElementById("gamePanel");
const gameScore = document.getElementById("gameScore");

let gameRunning = false;
let score = 0;
let playerX = 300;
let shots = [];
let targets = [];
let keys = {};

function resetGame() {
  score = 0;
  playerX = 300;
  shots = [];
  targets = Array.from({ length: 7 }, (_, i) => ({
    x: 45 + i * 82,
    y: 35 + Math.random() * 150,
    size: 9
  }));

  gameScore.textContent = "SCORE: 0";
  gameRunning = true;
  drawGame();
}

function drawGame() {
  if (!gameRunning) return;

  gameCtx.fillStyle = "#080a08";
  gameCtx.fillRect(0, 0, 600, 280);

  // Stars
  gameCtx.fillStyle = "#b8b4a8";
  for (let i = 0; i < 45; i++) {
    const x = (i * 137) % 600;
    const y = (i * 79) % 280;
    gameCtx.fillRect(x, y, 1, 1);
  }

  // Player ship
  if (keys.ArrowLeft) playerX = Math.max(15, playerX - 4);
  if (keys.ArrowRight) playerX = Math.min(585, playerX + 4);

  gameCtx.fillStyle = "#b7aa91";
  gameCtx.beginPath();
  gameCtx.moveTo(playerX, 240);
  gameCtx.lineTo(playerX - 12, 260);
  gameCtx.lineTo(playerX + 12, 260);
  gameCtx.closePath();
  gameCtx.fill();

  // Shots
  shots.forEach(shot => shot.y -= 5);
  shots = shots.filter(shot => shot.y > 0);

  gameCtx.fillStyle = "#e4e2d9";
  shots.forEach(shot => gameCtx.fillRect(shot.x - 2, shot.y, 4, 8));

  // Targets
  targets.forEach(target => {
    gameCtx.strokeStyle = "#91a398";
    gameCtx.beginPath();
    gameCtx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
    gameCtx.stroke();

    shots.forEach((shot, shotIndex) => {
      const distance = Math.hypot(
        target.x - shot.x,
        target.y - shot.y
      );

      if (distance < target.size + 5) {
        targets.splice(targets.indexOf(target), 1);
        shots.splice(shotIndex, 1);
        score += 10;
        gameScore.textContent = `SCORE: ${score}`;
      }
    });
  });

  if (targets.length === 0) {
    gameCtx.fillStyle = "#e4e2d9";
    gameCtx.font = "20px monospace";
    gameCtx.fillText("MISSION COMPLETE", 190, 140);
    gameRunning = false;
    return;
  }

  requestAnimationFrame(drawGame);
}

document.addEventListener("keydown", event => {
  keys[event.key] = true;

  if (event.code === "Space" && gameRunning) {
    event.preventDefault();
    shots.push({ x: playerX, y: 240 });
  }
});

document.addEventListener("keyup", event => {
  keys[event.key] = false;
});

document.getElementById("startGame").addEventListener("click", () => {
  gamePanel.hidden = false;
  resetGame();
});

document.getElementById("restartGame").addEventListener("click", resetGame);
