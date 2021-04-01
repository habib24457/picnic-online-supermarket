import React, { useState, useEffect } from 'react';
import './Update.css';
import { Button, Nav, Navbar, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Update = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://lychee-surprise-09798.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const deleteItem = (id) => {
        fetch(`https://lychee-surprise-09798.herokuapp.com/deleteItem/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted');
                window.location.reload();
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
                                <Link to={"/login"}>
                                    <Button className="btn btn-danger">Login</Button>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map(product =>
                                    <tr id="pData">
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.weight}</td>
                                        <td>
                                            <Button onClick={() => deleteItem(product._id)} className="btn btn-warning">Delete</Button>
                                        </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                </div>
            </div>
        </Container>
    );
};

export default Update;