import React,{ Component } from 'react';
import './LineChart.css';
var Chart = require("chart.js");

class LineChart extends Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
      console.log('asa');

      this.state={

      }

    }
    
    componentDidMount() {
      console.log('component LC did mounted');
      var ctx = document.getElementById('myChart').getContext("2d");
      var myChart = new Chart(ctx, this.props.chartData);
    }
  
    componentDidUpdate() {
         console.log('component LC did update');
         var ctx = document.getElementById('myChart').getContext("2d");
         var myChart = new Chart(ctx, this.props.chartData);
    }

    render() {
      return (<div className="chart-container">
      <canvas id="myChart"></canvas>
      </div>);
    }
  }
  export default LineChart;
