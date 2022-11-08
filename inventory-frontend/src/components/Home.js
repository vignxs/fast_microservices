import { Wrapper } from "./Wrapper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = 


    <div className="hero" style={{height: '100vh', width: '100 %',  backgroundImage: 'url("eshop.webp")',backgroundSize:'cover',backgroundPosition: 'center'}} >
        <div className="content1" style={{ height:'28vh', width:'80%' , margin: 'auto', display: 'flex',    alignItems: 'center',justifyContent: 'space-between'}}>
            <h4 style={ { color:"blueviolet", fontSize: '30px', paddingLeft: "20%" ,letterSpacing: '1px', paddingTop: "20%"   }}>IGS-Store</h4>
        </div>
        <div className="container">
            <div className="row">
            </div>
        </div>
        <div className="main1">
            <h3 style={{ fontSize:'50px' }}> A New Shopping</h3>
            <h4 style={{ fontSize: '30px', textAlign:'center' }}>Exprience awaits</h4>
            <h3 style={{ fontSize: '50px', textAlign: 'center' }}> You! </h3>
            <a href={"http://localhost:3000/dashboard/"} >
                <button className="btn btn-outline-danger btn-sn"> <i className="bi bi-shop" />Open Dashboard</button>
            </a>
        </div>
    </div>
