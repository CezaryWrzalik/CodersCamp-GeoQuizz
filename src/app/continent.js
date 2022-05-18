require('dotenv').config();
import 'regenerator-runtime/runtime';
import { Quiz } from './quiz.js';
import { addOnClickListeners, capitalizeFirstLetter, closeQuiz } from './helpers.js';
import { ModalWindow } from './ModalWindow.js';
import { weather } from './weather.js';
import { Country } from './Country.js';

console.log(process.env.WEATHER_API_KEY4);

let modalQuiz;

function mainMenu() {
  const menu = document.querySelector('.menu'),
    menuArrow = document.querySelector('.menu__arrow');

  menuArrow.addEventListener('click', () => {
    changeMenu();
  });
}

function changeMenu() {
  document.querySelector('.menu').classList.toggle('menu--active');
  document.querySelector('.menu__arrow').classList.toggle('menu__arrow--active');
}

function settings() {
  const settingsBtn = document.querySelector('.settings__icon'),
    settingsMenu = document.querySelector('.settings__menu');
  settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('settings__menu--active');
  });
}

const site = window.location.pathname.split('.')[0].substring(1);
const continetsData = require(`../assets/json/continents-data.json`);
const countriesTable = continetsData[site];

const countryInstances = countriesTable.map((country) => new Country(country.country));

Promise.all(countryInstances.map((country) => (country.fetchCountryInfo(), country.fetchWeather())))
  .then(() => console.log('Weather and countryInfo for all countries fetched'))
  .catch((e) => console.log(e));
console.log('Zakomentowane żeby nie zużywać WeatherAPI');

function quiz(countriesTable, continent) {
  const mainElement = document.getElementById('app');
  modalQuiz = document.getElementById('modalWindowQuiz');
  if (!modalQuiz) {
    modalQuiz = new ModalWindow(mainElement, closeQuiz, "modalWindowQuiz");
  }
  const quiz = new Quiz(countriesTable, modalQuiz, continent);
  addOnClickListeners(quiz.verifyAnswer, 'country', quiz);
  quiz.startQuiz(quiz);
}

function attachMenuListeners() {
  const weatherButton = document.getElementById('menu__weather');
  weatherButton.addEventListener('click', () => {
    if(modalQuiz){
      modalQuiz.close()
    }
    weather('weather', countryInstances);
    const menu = document.querySelector('.menu');
    const menuArrow = document.querySelector('.menu__arrow');
    menu.classList.toggle('menu--active');
    menuArrow.classList.toggle('menu__arrow--active');
    // weatherObj.showWeather()
  });

  const countryInfoButton = document.getElementById('menu__info');
  countryInfoButton.addEventListener('click', () => {
    if(modalQuiz){
      modalQuiz.close()
    }
    weather('country-info', countryInstances);
    const menu = document.querySelector('.menu');
    const menuArrow = document.querySelector('.menu__arrow');
    menu.classList.toggle('menu--active');
    menuArrow.classList.toggle('menu__arrow--active');
  });

  const quizButton = document.getElementById('menu__quiz');
  quizButton.addEventListener('click', () => {
    weather('none');
    changeMenu();
    quiz(countriesTable, capitalizeFirstLetter(site));
  });
}

attachMenuListeners();
mainMenu();
settings();
