document.addEventListener("DOMContentLoaded", () => {
  const username = "DiogoMekie"; // your GitHub username
  const projectsContainer = document.getElementById("projects-grid");

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

