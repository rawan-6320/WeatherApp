
const capitals = [
  "Cairo",
  "London",
  "Paris",
  "Tokyo",
  "Rome",
  "Riyadh",
  "New York",
  "Doha",
  "Washington",
  "Berlin",
];
const container = document.querySelector(".cards");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
//   console.log("Response status for", city, res.status);
  const data = await res.json();
//   console.log("Data for", city, data);
  return data;
}

async function showWeather() {
  container.innerHTML = "";

  for (const city of capitals) {
      const data = await getWeather(city);
      const icon = data.weather[0].icon;
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].main;

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="icon">
      <h3>${city}</h3>
      <p class="temp">${temp}°C</p>
      <p>${desc}</p>
    `;
      container.appendChild(card);
  }
}

showWeather();
