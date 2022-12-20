import React from 'react'

function WeekData({state}) {
  console.log(state);
  return (
    <div>

        <div className='days'>
            <div className="daywrapper">

                  
                    <hr></hr>  
                    <div className="day-today dayofweek">
                        <span className="day"><h2><b>{state.day}</b></h2></span>
                        <span>{state.weekInfo}</span>
                        <span className="image"><img src={`https://openweathermap.org/img/wn/${state.icon}@2x.png`} className='dayimg' alt="" /></span>

                        <span className="degree">{state.min}° C - {state.max}° C</span>
                        <span className="weather"><b>{state.main}</b></span>
                        <span className="weather-details">{state.description}</span>    
                    </div> 
                    <hr></hr> 

            </div>
            
        </div>

    </div>
  )
}

export default WeekData