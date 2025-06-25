import React, { useState, useEffect } from 'react'
import sunny from '../assets/Images/sunny.png'
import cloudy from '../assets/Images/cloudy.png'
import rainy from '../assets/Images/rainy.png'
import snowy from '../assets/Images/snowy.png'
import loadingGif from '../assets/Images/loading.gif'

const WeatherApp = () => {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  // const [suggestions, setSuggestions] = useState([])

  const api_key = "0599e5d7109b3e91bac531867ae80569"

  // Fetch default weather (Kathua)
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true)
      const defaultLocation = "Kathua"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${api_key}`
      const res = await fetch(url)
      const defaultData = await res.json()
      setData(defaultData)
      setLoading(false)
    }
    fetchDefaultWeather()
  }, [])

  // Handle typing and fetch suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value
    setLocation(value)

    //hufimnkv
    // if (value.length >= 4) {
    //   const url = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${api_key}`
    //   const res = await fetch(url)
    //   const result = await res.json()
    //   setSuggestions(result)
    // } else {
    //   setSuggestions([])
    // }


  }

  // Search by city name (manual search)
  const search = async () => {
    if (location.trim() !== "") {
      setLoading(true)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`
      const res = await fetch(url)
      const searchData = await res.json()
      if (searchData.cod !== 200) {
        setData({ notFound: true })
      } else {
        setData(searchData)
        setLocation('')
      }
      // setSuggestions([])
      setLoading(false)
    }
  }

  //gtsrdyfui
  // Search by coordinates (when suggestion clicked)
  // const searchByCoords = async (lat, lon) => {
  //   setLoading(true)
  //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
  //   const res = await fetch(url)
  //   const searchData = await res.json()
  //   setData(searchData)
  //   setLocation('')
  //   setSuggestions([])
  //   setLoading(false)
  // }
  // const handleSuggestionClick = (item) => {
  //   setLocation(item.name)
  //   setSuggestions([])
  //   searchByCoords(item.lat, item.lon)
  // }




  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }

  // Weather images and backgrounds
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  }

  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null

  const backgroundImages = {
    Clear: 'linear-gradient(to right, #ef9534, #fabd4d)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff, #fff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4, #71eeec)'
  }

  const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : null

  // Date
  const currentDate = new Date()
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dayOfWeek = daysOfWeek[currentDate.getDay()]
  const month = months[currentDate.getMonth()]
  const dayOfMonth = currentDate.getDate()
  const formattedDate = `${dayOfWeek}, ${dayOfMonth}, ${month}`

  return (
    <div className="container" style={{ backgroundImage }}>
      <div className="weather-app" style={{ backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top") : null }}>
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>

          <div className="search-bar" style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder='Enter Location'
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>



            {/* Suggestions dropdown */}
            {/* {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(item)}>
                    {item.name}{item.state ? `, ${item.state}` : ''}, {item.country}
                  </li>
                ))}
              </ul>
            )} */}



          </div>
        </div>

        {loading ? (
          <img className='loader' src={loadingGif} alt='loading' />
        ) : data.notFound ? (
          <div className='not-found'>Not Found 😒</div>
        ) : (
          <>
            <div className="weather">
              <img src={weatherImage} alt="weather-icon" />
              <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
              <div className="temp">{data.main ? `${Math.round(Number(data.main.temp) - 273.15)}°` : null}</div>
            </div>

            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>

            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{data.main ? data.main.humidity : null}%</div>
              </div>

              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{data.wind ? data.wind.speed : null}km/h</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherApp


// all the commented code is for the search options and locations when we search on the search box.