import { Wrapper } from "./Wrapper";
import React, { useEffect, useState } from 'react';



import { Chart as ChartJS, ArcElement,CategoryScale, LinearScale, Filler, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend);

export const options = {
    // maintainAspectRatio:false,
    responsive: true,
    hitRadius:200,
    hoverRadius:10,
    point: {
        radius: 0
    },
};

export const optionsDough = {
    aspectRatio:2,
    responsive: true,
};
export const optionsPie = {
    aspectRatio: 2, 
    responsive: true,
    hoverRadius: 50,
};



const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export const Dashboard = () => {
    const [orders, setProducts] = useState([]);
    const [prods, setProds] = useState([]);
    const [invn, setinventory] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8001/all_orders');
            const content = await response.json();
            setProducts(content);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8001/all_prods');
            const content = await response.json();
            setProds(content);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/all_prods_count');
            const content = await response.json();
            setinventory(content);
        })();
    }, []);

    const data3 = {
        labels: Object.keys(invn),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(invn),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 3,
            },
        ],
    };
  
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Profit',
                data:  orders,
                bezierCurve: false,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                elements: {
                    line: {
                        tension: 0.3
                    },
                },
            }
        ],
    };
    const data1 = {
        labels: Object.keys(prods) ,// ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Best Seller',
                data: Object.values(prods),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 3,
            },
        ],
    };



    return (

        <Wrapper>
            <h1 style={{paddingTop: '20px'}}>Sales Dashboard</h1>
            <div class="container" style={{paddingTop:'20px'}}>

                <div class="row">
                    <div class="col-md">
                        <div class="card">
                            <div class="card-body" style={{ borderRadius: '8px' , boxShadow:'0 4px 8px 0 rgba(0,0,0,.2), 0 0 6px rgba(0,0,0,.15)'}}>
                                <div class="border-bottom card-header"> <h6 class="m-0">Best Seller</h6> </div>

                                    <Pie  data={data1} options={optionsPie} />
                            </div>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="card">
                            <div class="card-body" style={{ borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0,0,0,.2), 0 0 6px rgba(0,0,0,.15)' }}>
                                <div class="border-bottom card-header"> <h6 class="m-0">Inventory Stats</h6> </div>
                                    <Doughnut data={data3} options={optionsDough} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style={{ paddingBottom: '100px', paddingTop: '60px', paddingLeft:'135px' }}>
                    <div class="col-md">
                        <div>
                            <div class="card-body" style={{ paddingBottom: '500px',borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0,0,0,.2), 0 0 6px rgba(0,0,0,.15)',width:'900px', height:'450px'}}>
                                <div class="border-bottom card-header"> <h6 class="m-0">Sales Stats</h6> </div>
                                <Line data={data} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </Wrapper>
    );
    // options = { options }
}

