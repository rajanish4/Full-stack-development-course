import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
  <div>
  find countries: <input value={props.newFilter} 
  onChange={props.handleCountryFilter} />
  </div>
  )
}

const Display = (props) => {
  if (props.name.toLowerCase().includes(props.filter.toLowerCase())){
    return (
    <>
    <li>{props.name} <button onClick={() => props.handleShow(props.name)}>show</button> </li> 
    </>
  )}
}

const DisplayCountry = (props) => {
  if (props.country.name.common.toLowerCase().includes(props.filter.toLowerCase())){
    console.log('single country', props.country)
    const api_key = "81e38ef1bd2c3a8b949158a0cedc5f0d"
    const lat = props.country.latlng[0]
    const lon = props.country.latlng[1]
    console.log('lat lon', lat, lon)
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        //setNewWeather(response.data)
        console.log('weather response:', response.data)
    })
    return (
    <>
      <h1>{props.country.name.common}</h1>
      <p>Capital {props.country.capital}</p>
      <p>Area {props.country.area}</p> 
      <p>Languages</p> 
      {Object.keys(props.country.languages).map(code => <li key={code}>{props.country.languages[code]}</li>)}
      <img src={props.country.flags.png} alt={props.country.flags.alt}/>
    </>
  )}
}

const Countries = (props) => {
  if (props.allCountries.length > 0){
    console.log(props.allCountries)
    console.log('in countries funct', props.allCountries.map(country => country.name.common))
    const allnames = props.allCountries.map(country => country.name.common)
    console.log('allnames', allnames)
    const matchnames = allnames.filter(name => name.toLowerCase().includes(props.newFilter))
    console.log('matched names', matchnames, matchnames.length)
    if (matchnames.length === 1){
      return(
      <div>
        {
          props.allCountries.map((country, index) =>
          <DisplayCountry key={index} country={country} filter={props.newFilter}/>
        )}
      </div>
      )}
    else if (matchnames.length <= 10){
      return(
        <div>
          {props.allCountries.map((country, index) =>
          <Display key={index} 
          name={country.name.common} 
          country={country}
          filter={props.newFilter}
          handleShow={props.handleShow} />
          )}
        </div>
      )}
    else{
      return(
        <div>
          Too many matches, specify another filter.
        </div>
      )
    }
    }
  }

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [newWeather, setNewWeather] = useState([])
  //const api_key = import.meta.env.VITE_SOME_KEY
  //const api_key = "d55523e278f7b344a3ca690cad37cc82"
  //console.log('api key is', api_key)

  useEffect(() => {
    console.log('effect run, country is now', country)

    // skip if currency is not defined
    //if (newFilter) {
    console.log('fetching all countries...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
    //}
    console.log('countries are', allCountries)
  }, [newFilter])

  // useEffect(() => {
  //   console.log('weather effect', newWeather)
  //   console.log('country is', country)

  //   // skip if currency is not defined
  //   //if (newFilter) {
  //   console.log('fetching weather...')
  //   // axios
  //   //   .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
  //   //   .then(response => {
  //   //     setNewWeather(response.data)
  //   //   })
  //   //}
  //   //console.log('countries are', allCountries)
  // }, [newFilter])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  const handleCountryFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    console.log('new filter value', newFilter)
  }

  const handleShow = (countryName) => {
    const selectedCountry = allCountries.find((country) => country.name.common === countryName)
    setCountry(selectedCountry)
  }


  return (
    <div>
      <Filter newFilter={newFilter} handleCountryFilter={handleCountryFilter}/>
      <Countries allCountries={allCountries} newFilter={newFilter} handleShow={handleShow}/>
      {country && <DisplayCountry country={country} filter={newFilter} />}
    </div>
  )
}
export default App