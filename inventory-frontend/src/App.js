import {Products} from "./components/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ProductsCreate} from "./components/ProductsCreate";
import {Orders} from "./components/Orders";
import {Dashboard} from "./components/Dashboard";

import React from 'react';
// import { Bar } from 'react-chartjs-2';
import { Chart as Bar } from 'chart.js';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/create" element={<ProductsCreate/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />

        </Routes>
    </BrowserRouter>;
}

export default App;
