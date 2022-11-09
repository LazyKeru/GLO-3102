class Coords {
    constructor() {
      this.loading = true
      this.latitude = undefined
      this.longitude = undefined
      navigator.geolocation.getCurrentPosition(this.locSuccess, this.locError)
    }

    locError = (error) => console.error("Error " + error.code + ": " + error.message) 

    locSuccess = (position) => {
        console.log("Success fetching latitude and longitude: [" + position.coords.latitude + "," + position.coords.longitude +"]")
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.loading = false
    }
  }

export default Coords;