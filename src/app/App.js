import { Country } from './Country'
import { handleSelectContinent } from './selectTag';

const countriesTable = require("../assets/json/europe-data.json")

const countryInstances = countriesTable.map((country) => new Country(country.country))

Promise.all(countryInstances.map(country =>
    (country.fetchCountryInfo(), country.fetchWeather())))
    .then(() => console.log('Weather and countryInfo for all countries fetched'))
    .catch((e) => console.log(e))
console.log('Zakomentowane żeby nie zużywać WeatherAPI');