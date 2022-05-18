const modal = document.getElementsByClassName('info-modal')[0];
const countries = document.querySelectorAll('.country');

export function weather(active, countryInstances) {
  async function showWeather() {
    const selectedCountry = countryInstances.filter((countryInstance) => countryInstance.name === this.id);
    const weatherData = await selectedCountry[0].getWeather();
    modal.innerHTML = `<div class="info-modal__weather">
            <div class="info-modal__weather__country">${this.id}</div>
            <div class="info-modal__weather__capital">${selectedCountry[0].countryInfo.capital}</div>
            <div class="info-modal__weather__temp">
            <img src="static/assets/weather-icons/${weatherData.icon}.png" alt="">
            <span class="info-modal__weather__temp__actual">${weatherData.temperature}°C</span>
        </div>
        <div>
            <div class="info-modal__weather__line"> </div>
            <div class='info-modal__weather__data'>
                <div class='info-modal__weather__data__element'>
                <div class="info-modal__weather__data__element--title">SUNSET</div>
                <div class="info-modal__weather__data__element--data">${weatherData.sunrise}</div>
            </div>
            <div class='info-modal__weather__data__element'>
                <div class="info-modal__weather__data__element--title">SUNSET</div>
                <div class="info-modal__weather__data__element--data">${weatherData.sunset}</div>
            </div>
            </div>
        </div>
        
        <div class="info-modal__weather__line"> </div>
        <div class='info-modal__weather__data'>
        <div class='info-modal__weather__data__element'>
        <div class="info-modal__weather__data__element--title">CLOUDS</div>
        <div class="info-modal__weather__data__element--data">${weatherData.clouds}%</div>
        </div>
        <div class='info-modal__weather__data__element'>
        <div class="info-modal__weather__data__element--title">HUMADITY</div>
                <div class="info-modal__weather__data__element--data">${weatherData.humidity}%</div>
                </div>
                </div>
                <div class="info-modal__weather__line"> </div>
                <div class='info-modal__weather__data'>
            <div class='info-modal__weather__data__element'>
            <div class="info-modal__weather__data__element--title">WIND</div>
            <div class="info-modal__weather__data__element--data">${Math.round(weatherData.wind)} km/h </div>
            </div>
            <div class='info-modal__weather__data__element'>
            <div class="info-modal__weather__data__element--title">DIRECTION</div>
            <div class="info-modal__weather__data__element--data">${weatherData.direction}</div>
            </div>
            </div>
            <div class="info-modal__weather__line"> </div>
        <div class='info-modal__weather__data'>
        <div class='info-modal__weather__data__element'>
        <div class="info-modal__weather__data__element--title">PRECIP</div>
        <div class="info-modal__weather__data__element--data">${Math.round(weatherData.precipitation)} in</div>
        </div>
        <div class='info-modal__weather__data__element'>
        <div class="info-modal__weather__data__element--title">FEELS LIKE</div>
                <div class="info-modal__weather__data__element--data">${weatherData.feelsLike}°C</div>
                </div>
                </div>
                <div class="info-modal__weather__line"> </div>
                <div class='info-modal__weather__data'>
                <div class='info-modal__weather__data__element'>
                <div class="info-modal__weather__data__element--title">VISIBILITY</div>
                <div class="info-modal__weather__data__element--data">${weatherData.visibility}km</div>
                </div>
            <div class='info-modal__weather__data__element'>
            <div class="info-modal__weather__data__element--title">PRESSURE</div>
            <div class="info-modal__weather__data__element--data">${weatherData.pressure} hPa</div>
            </div>
            </div>
            </div>`;
  }

  function showCountryInfo() {
    const selectedCountry = countryInstances.filter((countryInstance) => countryInstance.name === this.id.replace("-", " "));
    (async () => {
      const countryInfoData = await selectedCountry[0].getCountryInfo();
      console.log(countryInfoData);
      modal.innerHTML = `<div class="info-modal__weather__country">${this.id}</div>
                <div class="info-modal__flag">
                  <img src="${countryInfoData.flag}" alt="">
                </div>
                <div class="info-modal__countryInfo">CAPITAL:<b> ${countryInfoData.capital}</b></div>
                <div class="info-modal__countryInfo">POPULATION:<b> ${countryInfoData.population}</b></div>
                <div class="info-modal__countryInfo">SURFACE:<b> ${countryInfoData.surface}</b></div>
                <div class="info-modal__countryInfo">CURRENCY:<b> ${countryInfoData.currency}</b></div>`;
    })();
  }

  if (active === 'weather') {
    modal.style.display = 'block';
    modal.innerHTML = 'Kliknij w kraj by wyświetlić pogodę';
    const countries2 = document.querySelectorAll('.country');

    countries2.forEach((country) => {
      // country.replaceWith(country.cloneNode(true));
      country.removeEventListener('click', showCountryInfo);
      country.addEventListener('click', showWeather, true);
    });
    // countries2.forEach(country => country.removeEventListener('click', showWeather))
    // countries.forEach(country => country.addEventListener('click', showWeather, true))
  } else if (active === 'country-info') {
    modal.style.display = 'block';
    modal.innerHTML = 'Kliknij w kraj by wyświetlić infomracje o kraju';
    const countries2 = document.querySelectorAll('.country');

    countries2.forEach((country) => country.removeEventListener('click', showWeather));
    countries2.forEach((country) => country.addEventListener('click', showCountryInfo, true));
  } else if (active === 'none') {
    modal.style.display = 'none';
  }
}
