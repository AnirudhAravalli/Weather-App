// Define your weather API endpoint (adjust as needed)
const weatherApi = "/weather";

// Select DOM elements
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const temperature = document.querySelector(".temperature span");
let locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

// Display the current day and date with increased font size
const currentDate = new Date();
const monthName = currentDate.toLocaleString("en-US", { month: "long" });
const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
dateElement.textContent = `${dayName}, ${currentDate.getDate()} ${monthName}`;
// Increase the size of the day and date display
dateElement.style.fontSize = "1.2rem"; // Adjust as desired

// On page load, display weather for Hyderabad by default
window.addEventListener("load", () => {
  showDataByCity("Hyderabad");
});

// Global keydown listener: if the user types any character and the search input is not focused, focus it.
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

// Allow the user to press Enter to submit the form
search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    weatherForm.dispatchEvent(new Event("submit"));
  }
});

// Handle form submission for manual city search
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Reset UI elements and show a loading message
  locationElement.textContent = "Loading...";
  weatherIcon.className = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";
  const city = search.value.trim();
  if (city) {
    showDataByCity(city);
  } else {
    locationElement.textContent = "Please enter a city.";
  }
});

async function showDataByCity(city) {
  try {
    const response = await getWeatherData(city);
    console.log("Weather API response (by city):", response);
    showData(response);
  } catch (error) {
    console.error("Error fetching city weather:", error);
    locationElement.textContent = "City not found.";
  }
}

function showData(response) {
  // Check for a successful API response (assuming response.cod == 200 indicates success)
  if (response.cod == 200) {
    // Update the weather icon based on the returned weather ID (adjust if needed for your icon library)
    const weatherId = response.weather[0].id;
    weatherIcon.className = `wi wi-owm-${weatherId}`;
    // Display the city name returned from the weather API
    locationElement.textContent = response.name;
    // Convert temperature from Kelvin to Celsius (adjust if necessary)
    temperature.textContent = `${Math.floor(response.main.temp - 273.15)}°C`;
    weatherCondition.textContent = response.weather[0].description.toUpperCase();
  } else {
    locationElement.textContent = "City not found.";
  }
}

async function getWeatherData(city) {
  // Encode the city parameter to handle special characters or spaces
  const locationApi = `${weatherApi}?address=${encodeURIComponent(city)}`;
  const response = await fetch(locationApi);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
