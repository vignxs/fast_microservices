import { Wrapper } from "./Wrapper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';

export const ProductListing = () => {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/products-listing');
            const content = await response.json();
            setProducts(content);
            console.log(content)

        })();
    }, []);


    // ReactDOM.render(); {
    //     const {
    //         products,
    //     } = this.state;
        return (
        < Wrapper >
                <h1 style={{ paddingTop: '20px', paddingBottom: '40px' }}>Our Products </h1>
        <div className="container">
                    <div className="row"> {
                Products.map((product, idx) => 

                    <div class="col-md-4" style={{ paddingBottom: '30px' }}>
                        <div class="card" >
                            <div class="card-body" style={{ borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0,0,0,.2), 0 0 6px rgba(0,0,0,.15)' }}>
                                <div class="border-bottom card-header"> <h6 class="m-0" style={ { paddingBottom:'20px' }}> {product.name} </h6> </div>
                                <div className="img-container">
                                    <img src={product.img_url} alt="product image " className="image card-img-top" />
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted" style={{ textAlign:'center', paddingTop:'20px' }}> {product.price} ₹ </h6>
                                <p className="card-text">You can get everything in life you want if you will just help enough other people get what they want </p>
                                <a href="http://localhost:3000/orders">
                                    <button className="btn btn-outline-primary btn-sn"> <i className="bi bi-shop" /> Buy Now!</button>
                                </a>
                            </div>
                        </div>
                    </div>  

            )}
            </div>
        </div>

        </Wrapper >
        
        );
       
    

        
    // }  
}


{/* <div className="mb4" key={idx} >

    <div className="col-lg-4 mb-3">
        <div className="card">
            
            <div className="card-body">
                <h5 className="card-title"> {product.name} </h5>
                
            </div>
        </div>
    </div>



</div> */}

{/* <div className="card-post h-100">
    <div className="card body">
        <h5 className="card-title">
            <a className="text-fiord-blue">
                {product.name}
            </a>
        </h5>
    </div>
    {/* <img src= {product.img_url} alt="fvdf "></img> */}
    // <div class="col-4 my-auto mx-auto"> <img src={product.img_url} class="img-fluid" /></div>
    {/* `url(${"})` */}


// </div> */}



{/* <div className="content">
    <img src={product.img_url} alt="product image " />
    <h3> {product.name} </h3>
    <p>decription </p>
    <h6> {product.price}</h6>
    <ul>
        <li><i className=" fa fa-star checked"> </i> </li>
        <li><i className=" fa fa-star checked"> </i> </li>
        <li><i className=" fa fa-star checked"> </i> </li>
        <li><i className=" fa fa-star checked"> </i> </li>
        <li><i className=" fa fa-star"> </i> </li>

    </ul>

    <button className="BUY-2"> Buy Now</button>
</div> */}