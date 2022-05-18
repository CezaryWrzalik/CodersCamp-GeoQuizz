require('dotenv').config();
const COUNTRY_INFO_API_URL = process.env.COUNTRY_INFO_API_URL;

export default async function fetchCountryInfo(name) {
    return (await fetch(`${COUNTRY_INFO_API_URL}${name}`)).json()
    .catch((error)=> {console.error('Błąd: ', error)});;
}