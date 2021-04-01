import React, { useState } from 'react';
import './ManageProducts.css';
import { useForm } from "react-hook-form";
import {Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const axios = require('axios').default;


const ManageProducts = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const productData = {
            name: data.productName,
            price: data.productPrice,
            weight: data.productWeight,
            imageURL: imageURL
        }
        const url = `https://lychee-surprise-09798.herokuapp.com/addProduct`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => {
                alert("Product saved", response);

            });
    };

    const handleImageUpload = (event) => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'f7675ca9a0ed0f2cd7c6d55c64d847b9');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Container>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/update">Update Products</Nav.Link>
                                <Nav.Link href="/manage">Add Product</Nav.Link>
                                <Link to="/home">
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row justify-content-center">
                <form className="form-group" onSubmit={handleSubmit(onSubmit)} >
                    <input className="form-control" name="productName" placeholder="Product Name" ref={register} required />
                    <br />
                    <input className="form-control" name="productPrice" placeholder="Price" ref={register} required />
                    <br />
                    <input className="form-control" name="productWeight" placeholder="Weight" ref={register} required />
                    <br />
                    <input name="exampleRequired" type="file" onChange={handleImageUpload} />
                    <br />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input type="submit" />
                </form>
            </div>
        </Container>
    );
};

export default ManageProducts;