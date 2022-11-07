import {Wrapper} from "./Wrapper";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

export const ProductsCreate = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [file, setImage] = useState('');

    const fileChange =(e) =>{
        setImage(e.target.files[0])
        console.log(e.target.files[0])
    }
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        var data = new FormData();
        console.log(name, price, quantity, file)
        // name: name, price: price, quantity: quantity,
        data.append("name", name);
        data.append('price' ,price);
        data.append('quantity' ,quantity);
        data.append("file", file);
        await fetch('http://localhost:8000/products', {
            method: 'POST', headers: { 'Accept': 'multipart/form-data' },body: data });

        await navigate(-1);
    }
    return <Wrapper>
        
        <form className="mt-3" encType="multipart/form-data" onSubmit={submit}>
             <div className="form-floating pb-3">
                 <input laceholder="Name"
                       onChange={e => setName(e.target.value)}
                />
                <label>Name</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Price"
                       onChange={e => setPrice(e.target.value)}
                />
                <label>Price</label>
             </div>

             <div className="form-floating pb-3">
                 <input type="number" className="form-control" placeholder="Quantity"
                       onChange={e => setQuantity(e.target.value)}
                />
                <label>Quantity</label>
            </div>

            <div className="form-floating pb-4">
                <input type="file" id="imageFile" accept=".jpeg, .png, .jpg" className="form-control" name="file"
                    onChange={fileChange}
                />
                <label>Image</label>
                
            </div>
            <hr></hr>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>

    </Wrapper>
}



// #snips
{/* <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input laceholder="Name"
                       onChange={e => setName(e.target.value)}
                />
                <label>Name</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Price"
                       onChange={e => setPrice(e.target.value)}
                />
                <label>Price</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Quantity"
                       onChange={e => setQuantity(e.target.value)}
                />
                <label>Quantity</label>
            </div>

            <div className="form-floating pb-4">
                <input type="file" id="imageFile" className="form-control" name="image"
                    onChange={e => setImage(e.target.value)}
                />
                <label>Image</label>
                
            </div>
            <hr></hr>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form> */}

{/* <form className="mt-3" onSubmit={submitData} id="myForm"  encType="multipart/form-data">
            <div className="form-floating pb-3"> 
                <input className="form-control" placeholder="Name"
                       onChange={e => setName(e.target.value)}
                />
                <label>Name</label>
            </div>
            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Price"
                       onChange={e => setPrice(e.target.value)}
                />
                <label>Price</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Quantity"
                       onChange={e => setQuantity(e.target.value)}
                />
                <label>Quantity</label>
            </div>

            <div className="form-floating pb-4">
                <input type="file" id="imageFile" className="form-control"/>
                <label>Image</label>
            </div>

            <hr></hr>
            <button className="w-100 btn btn-lg btn-primary"  type="submit">Submit</button>
        </form> */}

// function submitData() {
//     var fileInput = document.getElementById('imageFile');
//     if (fileInput.files[0]) {
//         var data = new FormData();
//         // data.append('info', JSON.stringify({ name: 'name', price: 1, quantity: 1}));
//         data.append("user_review", JSON.stringify({ id1: 1, id2: 2, message: "foo", rate: 5 }));
//         data.append("file", fileInput.files[0]);
//         fetch('http://localhost:8000/products', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json'
//             },
//             body: data
//         })
//     }
// }

// const submit = async e => {
//     e.preventDefault();
//     var fileInput = document.getElementById('imageFile');
//     if (fileInput.files[0]) {
//         var formData = new FormData();
//         // formData.append('info', JSON.stringify({ name: 'name', price: 1, quantity: 1}));
//         formData.append('file', fileInput.files[0]);

//         fetch('http://localhost:8000/products', {
//             method: 'POST',
//             // headers: {'Accept': 'application/json'},
//             body: formData
//         });

//         await navigate(-1)

//             .then(resp => resp.text())  // or, resp.json(), etc.
//             .then(data => {
//                 document.getElementById("responseArea").innerHTML = data;
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
// }


{/* <form className="mt-3" onSubmit={submit} action="http://127.0.0.1:8000/products-list" encType="multipart/form-data">
    name : <input type="text" name='name' />
    price : <input type="number" name="price" />
    <hr style={{ visibility: 'hidden' }} ></hr>

    quantity : <input type="number" name="quantity" />
    <input type="file" id="file" name="file" />
    {/* <input type="submit" value="submit"></input>      */}
    // <hr style={{ visibility: 'hidden' }} ></hr>
    // <button className="w-100 btn btn-lg btn-primary" type="submit" >Submit</button>

// </form> */}


// export const ProductsCreate = () => {

//     const navigate = useNavigate();
//     const submit = async e => {
//     e.preventDefault();

//     var fileInput = document.getElementById('imageFile');
//     if (fileInput.files[0]) {
//         var formData = new FormData();
//         // formData.append('info', JSON.stringify({ name: 'name', price: 1, quantity: 1}));
//         formData.append('file', fileInput.files[0]);

//         fetch('http://localhost:8000/products', {
//             method: 'POST',
//             // headers: {'Accept': 'application/json'},
//             body: formData
//         });

//         await navigate(-1)

//             .then(resp => resp.text())  // or, resp.json(), etc.
//             .then(data => {
//                 document.getElementById("responseArea").innerHTML = data;
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
// }
    
//     // $(function () {
//     //     $('data_info').submit(function (e) {
//     //         e.preventDefault();
//     //         $.ajax({
//     //             type: 'POST',
//     //             url: 'http://127.0.0.1:8000/products',
//     //             data: {
//     //                 name: $(this).name.value,
//     //                 price: $(this).price.value,
//     //                 quuntity: $(this).quantity.value,
//     //                 file:$(this).file.value
//     //             }
//     //         });
//     //         return false;
//     //     });
//     // })
//     // formpush(e); {
//     //     e.preventDefault();

//     //     $.ajax({
//     //         type: 'POST',
//     //         url: 'http://127.0.0.1:8000/products',
//     //         data: {
//     //             name: event.name.value,
//     //             price: event.price.value,
//     //             quuntity: event.quantity.value,
//     //             file: event.file.value,
//     //         },
//     //         success: function (data) {
//     //             console.log('Submission was successful.');
//     //             console.log(data);
//     //         },
//     //         error: function (data) {
//     //             console.log('An error occurred.');
//     //             console.log(data);
//     //         }
//     //     });

//     //     return false;
//     // }
    
//     return <Wrapper>
        
//         <form className="mt-3" onSubmit={submit}>
//             <div className="form-floating pb-3">
//                 <input laceholder="Name"
//                        onChange={e => setName(e.target.value)}
//                 />
//                 <label>Name</label>
//             </div>

//             <div className="form-floating pb-3">
//                 <input type="number" className="form-control" placeholder="Price"
//                        onChange={e => setPrice(e.target.value)}
//                 />
//                 <label>Price</label>
//             </div>

//             <div className="form-floating pb-3">
//                 <input type="number" className="form-control" placeholder="Quantity"
//                        onChange={e => setQuantity(e.target.value)}
//                 />
//                 <label>Quantity</label>
//             </div>

//             <div className="form-floating pb-4">
//                 <input type="file" id="imageFile" className="form-control" name="image"
//                     onChange={e => setImage(e.target.value)}
//                 />
//                 <label>Image</label>
                
//             </div>
//             <hr></hr>
//             <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
//         </form>

//     </Wrapper>
// }
