import { useEffect,useState} from "react";
import { Wrapper } from "./Wrapper";
import { useParams } from "react-router-dom";

export const Orders = (props) => {
    const {id }= useParams();
    const [quantity, setQuantity] = useState(0);
    const [output, setOutput] = useState('');
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('Buy your favorite product');
    const [delmessage, setDelMessage] = useState('Calculating Expected Delivery time...');
    const [msg, setMsg] = useState('')

 
    useEffect((props) => {
        fetch("http://localhost:8000/products/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setOutput(result);
                }
            );
    });



    const submit = async e => {
        e.preventDefault();

        await fetch('http://localhost:8001/orders', {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                id, quantity, email, name , pincode
            })
        });

        setMessage('Thank you for your order!');
    }

    const changeSecondValue = (e) => {
        setQuantity(e.target.value);
        setPrice(e.target.value * output.price);
        setName(output.name)
    }
    
    const deliveryTime = (e) => {
        setPincode(e.target.value);
        fetch("http://localhost:8001/delivery/" + e.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    setMsg(result);

                }
            );
        if (msg){
            setDelMessage("Expected Delivery time is " + msg  + " days.")   
        }
    }
    

    return <Wrapper>
    <div className="container">
        <main>
            <div className="py-5 text-center">
                <h2>Checkout form</h2>
                    <p className="lead">{message}   </p>
            </div>

                {/* <div className="img-container">
                    <img src={"images/fb82415753040482228b.jpg"} alt="product image " className="image card-img-top" />
                </div> */}
            <form onSubmit={submit}>
                    

                <div className="row g-3">
                    <div className="col-sm-6">
                        <label className="form-label">Name</label>
                        <input className="form-control" 
                                value={output.name} />
                    </div>
                    
                    <div className="col-sm-6">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control"
                            value={quantity}    onChange={e => changeSecondValue(e)}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Pincode</label>
                        <input type="number" className="form-control" onChange={e =>  deliveryTime(e)}  />
                    </div>

                    <div className="col-sm-6" >
                        <label className="form-label">Price</label>
                        <input className="form-control"
                                value={price * 1.2}
                        />
                    </div>
                        <div className="col-sm-6" >
                            <p className="lead" style={{ paddingBottom: '30px' , textAlign:'center' }} >{delmessage}   </p>
                        </div>
                </div>

                <hr className="my-4"/>
                <button className="w-100 btn btn-primary btn-lg" type="submit">Buy</button>
            </form>
        </main>
    </div>
    </Wrapper>
}