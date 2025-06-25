document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  animateHeroIntro();
  loadGitHubProjects();
  initContactForm();
  initParticles();
});

// === Hero Section Animation ===
function animateHeroIntro() {
  const line1Text = "Hello there!";
  const line2Text = "My name is Diogo.";
  const subtitles = [
    "Software Developer",
    "Tech Enthusiast",
    "Java Dev.",
    "Bookworm",
    "Aspiring Jedi"
  ];

  const line1El = document.getElementById("line1");
  const line2El = document.getElementById("line2");
  const subtitleEl = document.getElementById("subtitle");

  let i = 0, j = 0, subIndex = 0;

  function typeLine1() {
    if (i < line1Text.length) {
      line1El.textContent += line1Text.charAt(i++);
      setTimeout(typeLine1, 80);
    } else {
      setTimeout(typeLine2, 500);
    }
  }

  function typeLine2() {
    if (j < line2Text.length) {
      line2El.textContent += line2Text.charAt(j++);
      setTimeout(typeLine2, 80);
    } else {
      line2El.classList.add("cursor");
      setTimeout(() => updateSubtitle(), 600);
    }
  }

  function updateSubtitle() {
    subtitleEl.style.opacity = 0;
    setTimeout(() => {
      subtitleEl.textContent = subtitles[subIndex];
      subtitleEl.style.opacity = 1;
      subIndex = (subIndex + 1) % subtitles.length;
      setTimeout(updateSubtitle, 2500);
    }, 400);
  }

  typeLine1();
}

// === GitHub Projects ===
function loadGitHubProjects() {
  const username = "DiogoMekie";
  const projectsContainer = document.getElementById("projects-grid");

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
      const filtered = repos.filter(repo => !repo.fork);
      document.getElementById("projects-loading").style.display = "none";

      if (filtered.length === 0) {
        projectsContainer.innerHTML = "<p class='text-gray-400'>No public projects to show right now.</p>";
        return;
      }

      filtered.forEach(repo => {
        const card = document.createElement("div");
        card.className = `
          bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]
          p-6 rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all duration-300
          border border-gray-800 hover:border-amber-400 transform hover:-translate-y-1
        `;
        card.setAttribute("data-aos", "fade-up");

        card.innerHTML = `
          <div class="flex flex-col h-full justify-between">
            <div>
              <h3 class="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                ${repo.name}
              </h3>
              <p class="text-gray-300 mb-4 text-sm">${repo.description || "No description provided."}</p>
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
              class="inline-block mt-auto text-sm text-amber-400 hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-dotted">
              View on GitHub →
            </a>
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching GitHub repos:", error);
      document.getElementById("projects-loading").style.display = "none";
      projectsContainer.innerHTML = "<p class='text-red-500'>Failed to load projects.</p>";
    });
}

// === Contact Form ===
function initContactForm() {
  const form = document.getElementById("contact-form");
  const messageDiv = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const { name, email, title, message } = form;

    emailjs.send("service_bk2qiwl", "template_qva5tuq", {
      name: name.value,
      email: email.value,
      title: title.value,
      message: message.value,
    })
      .then(() => {
        messageDiv.textContent = "✅ Message sent successfully!";
        messageDiv.className = "text-green-400 text-center text-lg mt-4";
        form.reset();
      })
      .catch(error => {
        console.error("EmailJS error:", error);
        messageDiv.textContent = "❌ Something went wrong. Please try again.";
        messageDiv.className = "text-red-400 text-center text-lg mt-4";
      });
  });
}

// === Mobile Menu Toggle ===
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle("max-h-0", !isOpen);
    mobileMenu.classList.toggle("opacity-0", !isOpen);
    mobileMenu.classList.toggle("pointer-events-none", !isOpen);
    mobileMenu.classList.toggle("scale-y-0", !isOpen);
    mobileMenu.classList.toggle("max-h-screen", isOpen);
    mobileMenu.classList.toggle("opacity-100", isOpen);
    mobileMenu.classList.toggle("pointer-events-auto", isOpen);
    mobileMenu.classList.toggle("scale-y-100", isOpen);
  };

  menuToggle.addEventListener("click", toggleMenu);
  document.querySelectorAll("#mobile-menu a").forEach(link =>
    link.addEventListener("click", toggleMenu)
  );
}

// === Particles.js Config ===
function initParticles() {
  tsParticles.load("tsparticles", {
    background: { color: "transparent" },
    particles: {
      number: { value: 40, density: { enable: true, area: 800 } },
      color: { value: "#f59e0b" },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 0.5,
        random: true,
        straight: false,
        outMode: "out"
      }
    },
    fullScreen: { enable: false }
  });
}
