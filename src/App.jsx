
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setcoords] = useState()
  const [weather, setweather] = useState()
  const [temp, settemp] = useState()
  const success = pos => {
    setcoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {
      const apiKey = 'fc1ce2eac4f0ffb2e9174b897ad15202'

      const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(Url)
        .then(res => {
          setweather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * (9 / 5) + 32).toFixed(1)
          settemp({ celsius, farenheit })
        })
        .catch(err => console.log(err))

    }
  }, [coords])

  console.log(weather)

  return (
    <div className="App">
      {
        weather ?
          <WeatherCard
            weather={weather}
            temp={temp}
          />
          :
          <Loading />}

    </div>
  )
}

export default App
