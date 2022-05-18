require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.WEATHER_API_URL;

export default async function fetchWeather(capital) {
  return (await fetch(`${WEATHER_API_URL}${capital}&${WEATHER_API_KEY}`)).json().catch((error) => {
    console.error('Błąd: ', error);
  });
}
