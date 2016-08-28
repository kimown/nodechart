import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import {Line} from "react-chartjs";

const CONFIG={
    size:100
};

let ar=[];
let i=0;
while (ar.length<CONFIG.size){
    ar.push(i);
    ++i;
}

let LineChart = Line;

var MyComponent = React.createClass({
    getInitialState(){
        return {
            data:[]
        }
    },

    componentDidMount(){
        this.fetchData();
    },
    render: function () {
        let {data}=this.state;

        var chartData = {
            labels: ar,
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
    },


    fetchData() {
        let self=this;
        var sockjs_url = 'http://localhost:9999/echo';
        var sockjs = new SockJS(sockjs_url);

        sockjs.onopen = function () {
            print('[*] open', sockjs.protocol);
            sockjs.send(11);
        };
        sockjs.onmessage = function (e) {
            print(JSON.parse(e.data));
        };
        sockjs.onclose = function () {
            print('[*] close');
        };

        function print(msg) {
            if(typeof msg=='string'){
                console.log(msg);
            }else{
                console.log(msg.heapUsed);
                const format=1024*1024; //M
                let heapUsedAfterFormat = msg.heapUsed/format;
                let newData= self.getNewSeq(heapUsedAfterFormat);
                self.setState({data:newData});
            }
        }

    },
    getNewSeq(heapUsedAfterFormat) {
        let {data}=this.state;
        if(data.length<CONFIG.size){
            data.push(heapUsedAfterFormat);
        }else{
            data.shift();
            data.push(heapUsedAfterFormat);
        }
        return data;
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
