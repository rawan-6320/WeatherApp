const apiKey = "d30ba1571fcb97742c1bef87674dd3c0";
const search_btn = document.getElementById("searchBtn");
const result_div = document.getElementById("reasultDiv");

search_btn.addEventListener("click", async () => {
  result_div.style.display = "block";
  const city = document.getElementById("cityInput").value.trim().toLowerCase();

  if (!city) {
    result_div.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    result_div.innerHTML = "<p>Sorry, city not found :(</p>";
    return;
  }

  const data = await response.json();
  const { name } = data;
  const { temp } = data.main;
  const { description, icon } = data.weather[0];

  const iconMap = {
    "01d": "icons/sunIncon.png",
    "01n": "icons/moonIcon.png",
    "02d": "icons/fewCloud.png",
    "02n": "icons/nightCluod-removebg-preview.png",
    "03d": "icons/cloud-removebg-preview.png",
    "09d": "icons/rain-removebg-preview.png",
    "10d": "icons/rainyIcon-removebg-preview.png",
    "11d": "icons/stormIcon-removebg-preview.png",
    "13d": "icons/snowIcon-removebg-preview.png",
    "50d": "icons/mistIcon-removebg-preview.png",
  };

  const iconFile = iconMap[icon] || `https://openweathermap.org/img/wn/${icon}@2x.png`;

  result_div.innerHTML = `
    <h3>${name}</h3>
    <img src="${iconFile}" alt="weather icon" class="weather-icon" />
    <p>${description}</p>
    <p><b>${temp}°C</b></p>
  `;
});

