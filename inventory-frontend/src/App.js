import {Products} from "./components/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ProductsCreate} from "./components/ProductsCreate";
import {Orders} from "./components/Orders";
import {Dashboard} from "./components/Dashboard";
import { Wrapper } from "./components/Wrapper";
import { ProductListing } from "./components/ProductsListing";
import { AllOrders } from "./components/AllOrders";
import { Home } from "./components/Home";
import React from 'react';


function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={Home} />
            <Route path="/products" element={<ProductListing/>} />
            <Route path="/products-list" element={<Products/>}/>
            <Route path="/create" element={<ProductsCreate/>}/>
            <Route path="/orders/:id" element={<Orders/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/orders" element={<AllOrders />} />
        </Routes>
    </BrowserRouter>;
}

export default App;
