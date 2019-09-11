import React,{ Component } from 'react';
import './ForecastWeather.css';
import LineChart from './LineChart'

class ForecastWeather extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            infoArray: [],
            labelsArray: [],
            temperatureArray: [],
            precipitationArray: [],
            forecastDataArray: []
        };

    }

    componentDidMount(){
        console.log('component FW is mounted');
        fetch('http://api.openweathermap.org/data/2.5/forecast?q='+this.props.city+'&appid=1d06e632eef18e069e4aafef8c7b7415')
        .then(res=> res.json())
        .then( (result) => {
            
            this.setState({
                data: result,
                infoArray: result.list.slice(0,5),
                labelsArray: result.list.slice(0,5).map((obj)=>this.props.changeDateFormat(new Date(obj.dt*1000))),
                temperatureArray: result.list.slice(0,5).map((obj)=> (obj.main.temp - 273).toLocaleString()),
                precipitationArray: result.list.slice(0,5).map((obj)=> (obj.main.humidity).toLocaleString()),
            })
            console.log(this.state.data);console.log('test');
        })
        
    }

    componentDidUpdate(){
        console.log('component FW did update');
        
        if(this.state.data !== null){
            console.log(this.state.forecastDataArray);
        }

    }

    getChartData(labelsArray, dataArray, color, label, backgroundColor){
        var chartConfig = {
            type: 'line',
            data: {
                labels: labelsArray,
                datasets: [{
                    label: label,
                    borderColor: color,
                    pointBorderColor: color,
                    pointBackgroundColor: color,
                    pointHoverBackgroundColor: color,
                    pointHoverBorderColor: color,
                    pointBorderWidth: 10,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
					backgroundColor: backgroundColor,
                    borderWidth: 6,
                    data: dataArray
                }]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                tooltips: {
                 titleFontSize: 25,
                 bodyFontSize: 25
               },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            fontSize: 0,
                            max: Math.max(...dataArray) + (Math.max(...dataArray) - Math.min(...dataArray)),
                            min: Math.min(...dataArray) 	- (Math.max(...dataArray) - Math.min(...dataArray)),
                            padding: 20
                        },
                        gridLines: {
                           drawTicks: false,
                           display: false,
                           drawBorder: false,
                       }
        
                    }],
                    xAxes: [{
                       gridLines: {
                           zeroLineColor: "transparent",
                           display: false,
                       },
                        ticks: {
                            padding: 20,
                            fontSize: 40,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        };
        return chartConfig;
    }
    
    render(){

        if(this.state.data === null){
            
        return(
            <div>
                <LineChart
                    data={this.state.data}
                    title="My amazing data"
                    color="#70CAD1"
                    />
                    <div className="daily-weather container col-md-6">
                    </div>
            </div>
        );
    }
    else{

        var dataArray = this.state.data.list;
        var min_temp = 373;
        var max_temp = 273;

        if(this.state.forecastDataArray.length === 0){
            for(var i=0;i<dataArray.length-1;i++){
                if((new Date(dataArray[i].dt*1000).toLocaleDateString()) != new Date(dataArray[i+1].dt*1000).toLocaleDateString() ){
                    dataArray[i].min_temp = min_temp;
                    dataArray[i].max_temp = max_temp;
                    this.state.forecastDataArray.push(dataArray[i])
                    min_temp = 373;
                    max_temp = 273;
                    console.log(dataArray[i]);
                }
                else{
                    if(dataArray[i].main.temp_min < min_temp){
                        min_temp = dataArray[i].main.temp_min;
                    }
                    if(dataArray[i].main.temp_max > max_temp){
                        max_temp = dataArray[i].main.temp_max;
                    }
                }
            }
        }

        let chart;
        if(this.props.chartType === "temperature"){
            chart = <LineChart
            title="Temperature Chart"
            chartData={this.getChartData(this.state.labelsArray, this.state.temperatureArray,"#f2b852","Temp","#fcecc0")}
            />;
        }
        else if(this.props.chartType === "precipitation"){
            chart = <LineChart
            title="Precipitation Chart"
            chartData={this.getChartData(this.state.labelsArray, this.state.precipitationArray,"#74d3d6","Precipitation","#d9f4fa")}
            />;
        }
        else if(this.props.chartType === "wind"){

            chart = <div className="wind-chart container col-md-7">
            {this.state.data.list.slice(0,5).map((obj)=> <div key={obj.dt}>
                                                                <div className="wind-speed">{obj.wind.speed} km/h</div>
                                                                <div className="weather-icon"><div className=""><i className="fa fa-arrow-up wind-arrow" style={{WebkitTransform: 'rotate('+obj.wind.deg+'deg)'}}></i></div></div>
                                                                <div className="wind-time">{this.props.changeDateFormat(new Date(obj.dt*1000))}</div>
                                                            </div>)}</div>;
        }
        else{
            chart = <LineChart
            title="Temperature Chart"
            chartData={this.getChartData(this.state.labelsArray, this.state.temperatureArray,"#f2b852","Temp","#fcecc0")}
            />;
        }

        const display = this.state.forecastDataArray.map((obj)=> <div key={obj.dt}>
                                                                        <div className="dayName">{new Date(obj.dt*1000).toLocaleDateString('en-US',{weekday:'short'})}</div>
                                                                        <div className="weather-icon"><img src={"http://openweathermap.org/img/w/"+ obj.weather[0].icon +".png"} height="50px" alt="Weather Icon"></img></div>
                                                                        <div className="temp-range">
                                                                            <span className="max-temp"><b></b>{Math.round(obj.max_temp - 273)}° </span>
                                                                            <span className="min-temp">{Math.round(obj.min_temp - 273)}°</span>
                                                                        </div>
                                                                    </div>
                                                                    );

        return(
        <div>
                {chart}
            <div className="daily-weather container col-md-7">
                {display}
            </div>
        </div>
        );
    }
}
}
export default ForecastWeather;
