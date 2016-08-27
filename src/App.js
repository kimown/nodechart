import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import {Line} from "react-chartjs";

let LineChart = Line;

var MyComponent = React.createClass({
    getInitialState(){
        return {
            data:[65, 59, 80, 81, 56, 55, 40]
        }
    },

    componentDidMount(){
        let {data}=this.state;
        window.setInterval(()=>{
            data.shift();
            data.push(Math.ceil(Math.random()*100));
            this.setState(data);
            console.log(this.state.data);
        },1000)
    },
    render: function () {
        let {data}=this.state;

        var chartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data,
                    spanGaps: false,
                }
            ]
        };

        var options = {
            animation: false
        };
        return <LineChart data={chartData} options={options} width="600" height="250"/>
    }
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    <MyComponent />

                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;


/**
 *
 *
 * http://codepen.io/ztrayner/pen/VeJMRL
 */
