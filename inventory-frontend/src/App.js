import {Products} from "./components/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ProductsCreate} from "./components/ProductsCreate";
import {Orders} from "./components/Orders";
import {Dashboard} from "./components/Dashboard";
import { Wrapper } from "./components/Wrapper";
import React from 'react';


function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Wrapper />} />
            <Route path="/products" element={<Wrapper />} />
            <Route path="/products-list" element={<Products/>}/>
            <Route path="/create" element={<ProductsCreate/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />

        </Routes>
    </BrowserRouter>;
}

export default App;
