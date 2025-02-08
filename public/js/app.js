const weatherApi = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const temperature = document.querySelector(".temperature span");
let locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

const currentDate = new Date();
const monthName = currentDate.toLocaleString("en-US", { month: "long" });
const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
dateElement.textContent = `${dayName}, ${currentDate.getDate()} ${monthName}`;
dateElement.style.fontSize = "1.5rem";

if ("geolocation" in navigator) {
  locationElement.textContent = "Loading...";
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.village || data.address.county;
        if (city) {
          console.log(`Fetching weather for user's location: ${city}`);
          showDataByCity(city);
        } else {
          locationElement.textContent = "Location not found.";
        }
      } else {
        locationElement.textContent = "Location not found.";
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      locationElement.textContent = "Location not found.";
    }
  });
} else {
  locationElement.textContent = "Location not found";
}

document.addEventListener("keydown", (event) => {
  if (
    event.key.length === 1 &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    document.activeElement !== search
  ) {
    search.focus();
  }
});

search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    weatherForm.dispatchEvent(new Event("submit"));
  }
});

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  locationElement.textContent = "Loading...";
  weatherIcon.className = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";
  const city = search.value.trim();
  if (city) {
    console.log(`Fetching weather for searched city: ${city}`);
    showDataByCity(city);
  } else {
    locationElement.textContent = "Please enter a city.";
  }
});

async function showDataByCity(city) {
  try {
    const response = await getWeatherData(city);
    console.log("Weather API response:", response);
    showData(response);
  } catch (error) {
    console.error("Error fetching city weather:", error);
    locationElement.textContent = "Location not found.";
  }
}

function showData(response) {
  if (response.cod == 200) {
    const weatherId = response.weather[0].id;
    weatherIcon.className = `wi wi-owm-${weatherId}`;
    locationElement.textContent = response.name;
    temperature.textContent = `${Math.floor(response.main.temp - 273.15)}°C`;
    weatherCondition.textContent = response.weather[0].description.toUpperCase();
  } else {
    locationElement.textContent = "Location not found.";
  }
}

async function getWeatherData(city) {
  const locationApi = `${weatherApi}?address=${encodeURIComponent(city)}`;
  console.log(`API Call: ${locationApi}`);
  const response = await fetch(locationApi);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
