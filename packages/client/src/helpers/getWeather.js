const getWeather = async (lat, lon, setWeatherCallback) => {
  let data = {
      lat,
      lon
  }
  await fetch(`/api/v1/weather`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then((json) => {
      console.log('Weather was successfully fetched from API.');
      setWeatherCallback(json);
  })
  .catch((error) => {
      console.log(`Sorry, unable to fetch from API because ${error}`)
  });
}

export default getWeather;