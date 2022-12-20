import { useState } from 'react';
import axios from "axios";
import './componets/css/Style.css';
import DailyInfo from './componets/DailyInfo';
import WeekData from './componets/WeekData';
import Loader from './componets/Loader';

function App() {

  const [state, setState] = useState({
    value: "",
    current: {
    },
    weekInfo: [],
    loading: false,
    error: false,
  })

  const handleSearch = (e) => {

    setState({
      ...state,
      value: e.target.value
    })
    // console.log(state.value);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    console.log("beforeeeee===>", state.loading);

    setState({
      ...state,
      loading: true,
    })
    console.log("after====>", state.loading);
    axios.post(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${state.value}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`).then((response) => {
      // console.log(response);
      setState({
        ...state,
        loading: false,
      })
      const month = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ]

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const currentDate = new Date()

      const date = `${days[currentDate.getDay()]} ${[currentDate.getDate()]} ${month[currentDate.getMonth()]}`
      // console.log(currentDate)

      const sunset = new Date(response.data.list[0].sunset * 1000).toLocaleTimeString().slice(0, 4)
      const sunrise = new Date(response.data.list[0].sunrise * 1000).toLocaleTimeString().slice(0, 4)

      const currentdata = {
        city: response.data.city.name,
        country: response.data.city.country,
        population: response.data.city.population,
        description: response.data.list[0].weather[0].description,
        main: response.data.list[0].weather[0].main,
        icon: response.data.list[0].weather[0].icon,
        temp: response.data.list[0].temp.day,
        htemp: response.data.list[0].temp.max,
        ltemp: response.data.list[0].temp.min,
        sunrise,
        sunset,
        clouds: response.data.list[0].clouds,
        humidity: response.data.list[0].humidity,
        wind: response.data.list[0].speed,
        pressure: response.data.list[0].pressure,
        date
      }

      const weekData = response.data.list
      const weekInfo = weekData.map((item) => {
        return {
          icon: item.weather[0].icon,
          min: item.temp.min,
          max: item.temp.max,
          main: item.weather[0].main,
          description: item.weather[0].description,
          day: new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).slice(0, 3)

        }

      })
      console.log(weekInfo.day);
      // console.log(currentdata);
      setState({
        ...state,
        current: currentdata,
        weekInfo: weekInfo
      })
      console.log("currentData==>>>", state);
    }).catch(err => {
      setState({
        ...state,
        error: true,
        loading: false
      })
      console.log(err);
    })
  }


  return (
    <div className="body" >

      {/* -------------------------------Search Box------------------------------ */}

      <div className='search'>
        <form onSubmit={searchSubmit} >
        <div className="input-group rounded">
          <input type="search" class="form-control rounded" placeholder="Search Location, eg:- New York" aria-label="Search" onChange={handleSearch} aria-describedby="search-addon" />
          <i className="fas fa-search search-click" ></i>
        </div>
        </form>
      </div>

      {/* --------------------------- Top Left Side Box ------------------------ */}
      
      {state.loading === true ?
        <Loader /> :
        <>
          {state.current.city !== undefined ?
            <>
              <div class="card-left">

                <div className="card" style={{ color: '#4B515D' }}>
                  <div className="card-body p-5">

                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}> {state.current.city} {state.current.country} </h6>
                      <h6>{state.current.date}</h6>
                      <span className="small" style={{ color: '#868B94' }}>Population: {state.current.population}</span>

                    </div>
                  </div>
                </div>

              </div>

              {/* --------------------------- Top Right Side Box ------------------------ */}

              <DailyInfo state={state.current} />

              {/* ----------------------------- Week Info ----------------------------------- */}
              {state.weekInfo.map((info) => (

                <WeekData state={info} />
              ))}</> : <>{state.error === true ? <h1 className='error-text'>Oops! Data not found.</h1> : <></>} </>}

        </>}

    </div>
  );
}

export default App;