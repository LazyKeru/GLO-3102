const api_key = 'bdb489887f974387a3a9c53300d079d3' // a very bad and dangerous practice in a "real" app.
const api_base_url = 'http://api.weatherbit.io/v2.0/'

const checkStatus = (response) => {
  if (!response.ok)
    throw new Error(response.status + ': ' + response.statusText)
  return response
}

class WeatherService {

  generateUrl = (lat, lon, days) => {
    const url = api_base_url + 'forecast/daily?lat=' + lat + '&lon=' + lon + '&days=' + days + '&key=' + api_key
    return url
  }

  forecast = async (lat, lon, days) =>
    await fetch(
      this.generateUrl(lat, lon, days),
      {
        method: 'GET',
      }
    )
      .then(checkStatus)
      .then((response) => response.json())
      .catch((error) => error)
}

export default WeatherService
