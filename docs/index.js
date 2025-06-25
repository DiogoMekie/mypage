document.addEventListener("DOMContentLoaded", () => {
  const username = "DiogoMekie"; // your GitHub username
  const projectsContainer = document.getElementById("projects-grid");

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  let isOpen = false;

  menuToggle.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      mobileMenu.classList.remove("max-h-0", "opacity-0", "pointer-events-none", "scale-y-0");
      mobileMenu.classList.add("max-h-screen", "opacity-100", "pointer-events-auto", "scale-y-100");
    } else {
      mobileMenu.classList.remove("max-h-screen", "opacity-100", "pointer-events-auto", "scale-y-100");
      mobileMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none", "scale-y-0");
    }

  });

  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("max-h-screen", "opacity-100", "pointer-events-auto", "scale-y-100");
      mobileMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none", "scale-y-0");
      isOpen = false;
    });
  });

  menuToggle.classList.toggle("rotate-90");



  const line1Text = "Hello there!";
  const line2Text = "My name is Diogo.";

  const line1El = document.getElementById("line1");
  const line2El = document.getElementById("line2");
  const subtitleEl = document.getElementById("subtitle");

  let i = 0, j = 0;

  function typeLine1() {
    if (i < line1Text.length) {
      line1El.textContent += line1Text.charAt(i);
      i++;
      setTimeout(typeLine1, 80);
    } else {
      setTimeout(typeLine2, 500);
    }
  }

  function typeLine2() {
    if (j < line2Text.length) {
      line2El.textContent += line2Text.charAt(j);
      j++;
      setTimeout(typeLine2, 80);
    } else {
      // 💡 Show blinking cursor only now
      line2El.classList.add("cursor");
      setTimeout(startSubtitles, 600);
    }
  }


  typeLine1();

  // Subtitles
  const subtitles = [
    "Software Developer",
    "Tech Enthusiast",
    "Java Dev.",
    "Bookworm",
    "Aspiring Jedi"
  ];

  let subIndex = 0;

  function startSubtitles() {
    showNextSubtitle();
  }

  function showNextSubtitle() {
    subtitleEl.style.opacity = 0;
    setTimeout(() => {
      subtitleEl.textContent = subtitles[subIndex];
      subtitleEl.style.opacity = 1;
      subIndex = (subIndex + 1) % subtitles.length;
      setTimeout(showNextSubtitle, 2500);
    }, 400);
  }

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then((res) => res.json())
    .then((repos) => {
      const filtered = repos.filter(repo => !repo.fork);

      // Hide the spinner
      document.getElementById("projects-loading").style.display = "none";

      if (filtered.length === 0) {
        projectsContainer.innerHTML = "<p class='text-gray-400'>No public projects to show right now.</p>";
        return;
      }

      filtered.forEach((repo) => {
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
    .catch((error) => {
      console.error("Error fetching GitHub repos:", error);

      // Hide the spinner
      document.getElementById("projects-loading").style.display = "none";

      projectsContainer.innerHTML = "<p class='text-red-500'>Failed to load projects.</p>";
    });

});

const form = document.getElementById("contact-form");
const messageDiv = document.getElementById("form-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const title = this.title.value;
  const message = this.message.value;

  emailjs.send("service_bk2qiwl", "template_qva5tuq", {
    name: name,
    email: email,
    title: title,
    message: message,
  })
    .then(() => {
      messageDiv.textContent = "✅ Message sent successfully!";
      messageDiv.className = "text-green-400 text-center text-lg mt-4";
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      messageDiv.textContent = "❌ Something went wrong. Please try again.";
      messageDiv.className = "text-red-400 text-center text-lg mt-4";
    });
});

tsParticles.load("tsparticles", {
  background: {
    color: "transparent"
  },
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: "#f59e0b" // amber/gold
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.4,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outMode: "out"
    }
  },
  fullScreen: {
    enable: false
  }
});

