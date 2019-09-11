import React,{ Component } from 'react';
import './CurrentWeather.css';
import ForecastWeather from './ForecastWeather';

class CurrentWeather extends Component{

    constructor(props){
        super(props);
        console.log(this.props.dataVar);

        this.state = {
            values: null,
            chartType: "temperarture",
        };
        this.updateState = this.updateState.bind(this);
		this.changeDateFormat = this.changeDateFormat.bind(this);
    }

    componentDidMount(){
        console.log('component CW did mounted');
    }

    componentDidUpdate(){
        console.log('component CW did update');
    }

    updateState(e, value){
            this.setState({
                chartType: value,
            });
    }
	
	changeDateFormat(dateObj){
		var hourValue = dateObj.toLocaleTimeString().substring(0,2);
		let period;
		if(hourValue < 12){
			period = 'AM';
		}
		else{
			period = 'PM';
			if(hourValue >= 13){
				dateObj.setHours(dateObj.getHours() - 12);
			}
		}
		
		const formattedDate = dateObj.toLocaleTimeString().substring(0,5)+" "+period;
		
		return formattedDate;
	}

    render(){
        if(this.props.dataVar && this.props.dataVar.cod == 200){console.log('11111111');console.log(this.props.dataVar);
        return(
            <div>
            <div className="container col-md-6 current-weather">
                <div className="location-info">{this.props.dataVar.name}, {this.props.dataVar.sys.country}</div>
                <div className="time-info">{new Date(this.props.dataVar.dt*1000).toLocaleDateString('en-US',{weekday:'long'})}, {this.changeDateFormat(new Date(this.props.dataVar.dt*1000))}</div>
                <div className="weather-condition">{this.props.dataVar.weather[0].main}</div>

                <div className="weather-info-container">
                    <div className="weather-main padding0 col-md-6">
                        <div className="col-md-6 padding0">
                            <div className="weather-condition-image"><img src={"http://openweathermap.org/img/w/"+this.props.dataVar.weather[0].icon+".png"} height="80px" alt="Weather Icon"></img></div>
                        </div>
                        <div className="col-md-6">
                            <div className="temperature-info">
                                <span className="tempearture">{parseFloat(this.props.dataVar.main.temp -273).toFixed(2)}</span>
                                <span className="temperature-unit">°C</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="precipitation">Precipitation:<span> 83%</span></div>
                        <div className="humidity">Humidity:<span> {this.props.dataVar.main.humidity}%</span></div>
                        <div className="wind-speed">Wind:<span> {this.props.dataVar.wind.speed} km/h</span></div>
                        <div className="toggle-buttons">
                            <button onClick={(e)=> this.updateState(e,"temperature")}>Temperature</button>
                            <button onClick={(e)=> this.updateState(e,"precipitation")}>Precipitation</button>
                            <button onClick={(e)=> this.updateState(e,"wind")}>Wind</button>
                        </div>
                    </div>
                </div>
            </div>
            <ForecastWeather 
				chartType={this.state.chartType}
				city={this.props.city}
				changeDateFormat={this.changeDateFormat}
				/>
            </div>
            
        );
        }
        else if(this.props.dataVar && this.props.dataVar.cod == 404)
        {
            return <div className="image-404"></div>;
        }
		else{
			return <br></br>;
		}
    }
}
export default CurrentWeather;
