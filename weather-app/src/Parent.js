import React,{ Component } from 'react';
import './index.css';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';

class Parent extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount(){
        console.log('component Parent is mounted');
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.props.city+'&appid=1d06e632eef18e069e4aafef8c7b7415')
        .then(res=> res.json())
        .then( (result) => {
            
            this.setState({
                data: result
            })
            console.log(this.state.data);console.log('test');
        })
    }

    componentDidUpdate(){
        console.log('component Parent did update');
    }

    render(){
        return(
            <div>
                <CurrentWeather 
					dataVar={this.state.data}
					city={this.props.city}
				/>
                
            </div>
        );
    }
}
export default Parent;