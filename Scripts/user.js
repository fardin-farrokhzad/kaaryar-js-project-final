document.addEventListener("DOMContentLoaded", () => {
  const contents = document.getElementById("contents");

  // Parse the username from the query string
  const username = new URLSearchParams(window.location.search).get("username");

  if (!username) {
    contents.innerHTML = "<p>Username not found in URL.</p>";
    return;
  }

  // Show loader
  contents.innerHTML = `<div class="loader"></div>`;

  // Define API
  const userUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;
  function createBadge(label, value, color) {
    return `<span class="badge" style="background-color:${color}">${label} : ${value}</span>`;
  }
  // Render's user's info
  function renderUser(user) {
    return `
    <div class="profile">
      <div class="header-bar">
        <a href="../index.html" class="back">Back To Search</a>
        <span>hireable : ${user.hireable ? "✔️" : "❌"}</span>
      </div>

      <div class="user-card">
        <div class="avatar">
          <img src="${user.avatar_url}" alt="Avatar" />
          <h2>${user.name || user.login}</h2>
          <p>${user.location || "Unknown Location"}</p>
        </div>

        <div class="bio">
          <h3>Bio :</h3>
          <p>${user.bio || "No bio available"}</p>
          <a href="${
            user.html_url
          }" target="_blank" class="btn">Visit Github Page</a>
          <p>Login : ${user.login}</p>
          <p>Website : <a href="${user.blog}" target="_blank">${
      user.blog || "N/A"
    }</a></p>
        </div>
      </div>

      <div class="badges">
        ${createBadge("Followers", user.followers, "#e74c3c")}
        ${createBadge("Following", user.following, "#bdc3c7")}
        ${createBadge("Public Repos", user.public_repos, "#2ecc71")}
        ${createBadge("Public Gists", user.public_gists, "#2c3e50")}
      </div>

      <div id="repo-list"></div>
    </div>
  `;
  }
  // Render's user's repos
  function renderRepos(repos) {
    return `
    <div class="repo-list">
      ${repos
        .map(
          (repo) =>
            `<div class="repo-item"><a href='${repo.html_url}' target='_blank'>${repo.name}</a></div>`
        )
        .join("")}
    </div>
  `;
  }
  // Fetch user's data from API
  async function fetchUserData() {
    try {
      const [userRes, repoRes] = await Promise.all([
        fetch(userUrl),
        fetch(reposUrl),
      ]);

      const user = await userRes.json();
      const repos = await repoRes.json();

      // Replace loader with user content
      contents.innerHTML = renderUser(user);
      document.getElementById("repo-list").innerHTML = renderRepos(repos);
    } catch (error) {
      contents.innerHTML = `<p>Something went wrong. Could not fetch data.</p>`;
    }
  }
  // Fetch user's data when page loads
  fetchUserData();
});
