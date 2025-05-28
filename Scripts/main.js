const form = document.querySelector(".form-control");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear");
const contents = document.getElementById("contents");
const error = document.getElementById("error");
// Show loader inside #contents
function showLoader() {
  contents.innerHTML = `<div class="loader"></div>`;
}

// Render GitHub users after fetching
function renderUsers(users) {
  if (!users.length) {
    contents.innerHTML = `<p>No users found</p>`;
    return;
  }

  // Build the HTML content
  const userCards = users
    .map(
      (user) => `
      <div class="box-container">
        <div class="image-wrapper">
          <img src="${user.avatar_url}" alt="${user.login}'s avatar" />
        </div>
        <span>${user.login}</span>
        <a href="Pages/user.html?username=${user.login}">More</a>
      </div>`
    )
    .join("");

  contents.innerHTML = userCards;
}

// Fetch GitHub users and update UI
async function fetchUsers(query) {
  showLoader();

  try {
    const res = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error("GitHub API error");

    const data = await res.json();
    renderUsers(data.items);
    clearBtn.classList.add("show");
  } catch (err) {
    contents.innerHTML = `<p class="error">Something went wrong. ${err.message}</p>`;
  }
}

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    showError();
    return;
  }

  fetchUsers(query);
});

// Handle clear button
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  contents.innerHTML = "";
  clearBtn.classList.remove("show");
});
// Error message box
function showError() {
  error.classList.add("show");
  setTimeout(() => error.classList.remove("show"), 3000);
}
