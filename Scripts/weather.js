const form = document.querySelector(".form-control");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear");
const contents = document.getElementById("contents");
const apiKey = "75255bf75d5b429697f214819252405";
// Show loader inside #contents
function showLoader() {
  contents.innerHTML = `<div class="loader"></div>`;
}

// Render data after fetching
function renderData(data) {
  contents.innerHTML = `    <div class="wrapper">
        <div class="top">
          <h2 class="condition">${data.current.condition.text}</h2>
          <img src="https:${data.current.condition.icon}" alt="icon" />
          <div class="temp">
            <span class="temp-c">${data.current.temp_c}&deg;C</span>
            <span class="temp-f">${data.current.temp_f}&deg;F</span>
          </div>

          <h3 class="time">${data.location.localtime}</h3>
          <h4 class="region">${data.location.region}</h4>
          <span class="country"><i class="fa-solid fa-location-dot"></i> ${data.location.country}</span>
        </div>
        <div class="bottom">
          <div class="wind">
            <i class="fa-solid fa-wind"></i>
            <span class="value">${data.current.wind_kph}</span>
            <span class="text">Wind Speed</span>
          </div>
          <div class="humidity">
            <i class="fa-solid fa-droplet"></i>
            <span class="value">${data.current.humidity}</span>
            <span class="text">Humidity</span>
          </div>
          <div class="uv">
            <i class="fa-solid fa-sun"></i>
            <span class="value">${data.current.uv}</span>
            <span class="text">UV</span>
          </div>
        </div>
      </div>`;
}
// Fetch weather
async function fetchData(query) {
  showLoader();

  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        query
      )}`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    renderData(data);
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
    contents.innerHTML = `<p>Please enter a city</p>`;
    return;
  }

  fetchData(query);
});

// Handle clear button
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  contents.innerHTML = "";
  clearBtn.classList.remove("show");
});
