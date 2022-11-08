import { Wrapper } from "./Wrapper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AllOrders = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8001/allorders');
            const content = await response.json();
            setProducts(content);
            console.log(content)

        })();
    }, []);
    return <Wrapper>
        <h1 style={{ paddingTop: '20px', paddingBottom: '20px' }}>Orders</h1>
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Pyment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return <tr>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.total}</td>
                            <td>{product.status}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </Wrapper>
}
