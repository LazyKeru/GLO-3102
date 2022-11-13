class Coords {
    fetchPosition = (options) => {
      return new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        }
      )
    }
  }

export default Coords;