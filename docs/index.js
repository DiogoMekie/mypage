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

      filtered.forEach((repo) => {
        const card = document.createElement("div");
        card.className = "bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition";

        card.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${repo.name}</h3>
            <p class="text-gray-400 mb-4">${repo.description || "No description provided."}</p>
            <a href="${repo.html_url}" class="text-blue-400 hover:underline" target="_blank">View on GitHub</a>
          `;

        projectsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching GitHub repos:", error);
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
    color: "#0f172a"
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
      value: 0.6,
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

