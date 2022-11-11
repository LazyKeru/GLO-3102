class Coords {
    fetchPosition = (options) => {
      return new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        }
      )
    }

    locError = (error) => console.error("Error " + error.code + ": " + error.message) 

    locSuccess = (position) => {
        console.log("Success fetching latitude and longitude: [" + position.coords.latitude + "," + position.coords.longitude +"]")
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
    }
  }

export default Coords;