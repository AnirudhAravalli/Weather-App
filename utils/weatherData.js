import axios from "axios";

const openWeatherMap = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: process.env.API_KEY
};

const weatherData = async (address) => {
  const url = openWeatherMap.BASE_URL + encodeURIComponent(address) + "&APPID=" + openWeatherMap.SECRET_KEY;
  console.log("Request URL:", url);

  try {
    const result = await axios.get(url);
    return result.data; // Return only the data from the API
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw new Error("Weather data fetch failed.");
  }
};

export default weatherData;
