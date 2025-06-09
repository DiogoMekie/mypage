document.addEventListener("DOMContentLoaded", () => {
    const username = "DiogoMekie"; // your GitHub username
    const projectsContainer = document.getElementById("projects-grid");
  
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then((res) => res.json())
      .then((repos) => {
        // Optional: filter out forked repos
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
  