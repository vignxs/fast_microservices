import { Wrapper } from "./Wrapper";
import React, { useEffect, useRef } from 'react';
// import { Chart } from 'chart.js';
import { Chart } from 'chart.js'
import ReactDOM from 'react-dom';
import $, { data } from 'jquery'; 


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}
export const Dashboard = () => {

    <canvas id="myChart" width="400" height="400"></canvas>
    


    const ctx = document.getElementById('myChart').getContext('2d');

    $(document).ready(
        function () {
            showGraph();
        }
    );
    function showGraph() {
        $.get("http://127.0.0.1:8001/all_orders", function (data) {
            console.log(data);
            var name = ['Cases', 'Deaths', 'Recovered', 'Active'];
            var details = [];
            details.push(data.cases);
            details.push(data.deaths);
            details.push(data.recovered);
            details.push(data.active);
            console.log(name);
            console.log(details);
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        backgroundColor: ['#95a5a6', '#e74c3c', '#2ecc71', '#3498db'],
                        data: details
                    }
                ]
            };
            var options = {
                title: {
                    display: true,
                    text: 'COVID-19 CORONAVIRUS INDIAN STATUS'
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            };
            var graphTarget = $("#myChart");
            var graph = new Chart(graphTarget, {
                type: 'pie',
                data: chartdata,
                options: options
            });

        });
    }}

