const api_key = "";
const api_base_url = "http://api.weatherbit.io/v2.0/"
const units = "S"
const lang = "en"

const checkStatus = (response) => {
    if(!response.ok)
      throw new Error(response.status + ": " + response.statusText)
    return response
}

class WeatherService {
    forecast = async (lat, lon, days) => await fetch(
        api_base_url + "forecast/daily?lat=" + lat 
                                    + "&lon=" + lon
                                    + "&days=" + days
                                    + "&units=" + units
                                    + "&lang=" + lang
                                    + "&key=" + api_key,
        {
            method: 'GET',
        }
    )
    .then(checkStatus)
    .then((response) => response.json())
    .catch(error => error)
}

export default WeatherService;