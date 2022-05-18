import fetchCountryInfo from '../api/fetchCountryInfo.js';
import fetchCountryWeather from '../api/fetchCountryWeather.js';

export class Country {
  constructor(name) {
    this.name = name;
    this.weather;
    this.countryInfo;
  }

  async fetchWeather() {
    if (!this.countryInfo) {
      await this.fetchCountryInfo();
    }
    const weather = await fetchCountryWeather(this.countryInfo.capital);
    const weatherObj = weather.data[0];
    this.weather = {
      temperature: weatherObj.temp,
      clouds: weatherObj.clouds,
      sunrise: weatherObj.sunrise,
      sunset: weatherObj.sunset,
      humidity: weatherObj.rh,
      wind: weatherObj.wind_spd * 3.6,
      direction: weatherObj.wind_cdir,
      precipitation: weatherObj.precip,
      feelsLike: weatherObj.app_temp,
      visibility: weatherObj.vis,
      pressure: weatherObj.pres,
      icon: weatherObj.weather.icon
    };
  }

  async fetchCountryInfo() {
    if (!this.countryInfo) {
      const country = await fetchCountryInfo(this.name);
      const countryObj = country[0];
      this.countryInfo = {
        capital: countryObj.capital,
        population: countryObj.population,
        surface: countryObj.area,
        currency: countryObj.currencies[0].code,
        flag: countryObj.flag
      };
    }
    return this.countryInfo;
  }

  async getCountryInfo() {
    if (!this.countryInfo) {
      await this.fetchCountryInfo();
    }
    return this.countryInfo;
  }

  async getWeather() {
    if (!this.weather) {
      await this.fetchWeather();
    }
    return this.weather;
  }
}
// const countryInstances = countriesTable.map((country) => new Country(country.country))

// Promise.all(countryInstances.map(country =>
//     (country.fetchCountryInfo(), country.fetchWeather())))
//     .then(() => console.log('Weather and countryInfo for all countries fetched'))
//     .catch((e) => console.log(e))
// console.log('Zakomentowane żeby nie zużywać WeatherAPI')
