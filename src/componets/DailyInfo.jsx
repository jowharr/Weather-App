import React from 'react'

function DailyInfo({state}) {
  return (
    <div>
        <div className="card-right">

            <div className="card"  style={{color: '#4B515D'}}>
            <div className="card-body p-4">

                <div className="d-flex">
                <h6 className="flex-grow-1"><h6>{state.sunrise} AM</h6></h6>
                <h6>{state.sunset} PM</h6>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                <h6 className="display-4 mb-0 font-weight-bold" style={{color: '#1C2331'}}> {state.temp}° C </h6>
                <span className="small" style={{color: '#868B94'}}>{state.main}, {state.description}</span>
                </div>

                <div className="d-flex align-items-center">
                <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                    <div><i className="fas fa-wind fa-fw" style={{color: '#868B94'}}></i> <span className="ms-1"> {state.pressure} hPa  </span></div>
                    <div><i className="fas fa-tint fa-fw" style={{color: '#868B94'}}></i> <span className="ms-1"> {state.humidity}% </span>
                    </div>
                    <div><i className="fas fa-sun fa-fw" style={{color: '#868B94'}}></i> <span className="ms-1"> {state.wind} m/s N  </span>
                    </div>
                </div>
                <div>
                    <img src={`https://openweathermap.org/img/wn/${state.icon}.png`}
                    width="100px" alt='img'/>
                </div>
                </div>

            </div>
            </div>

        </div>
    </div>
  )
}

export default DailyInfo