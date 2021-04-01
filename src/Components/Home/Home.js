import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { Button, Navbar, Nav, Container, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../../App";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    console.log(setLoggedinUser);


    useEffect(() => {
        fetch('https://lychee-surprise-09798.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    const handleOrder = (orderedProduct) => {
        console.log('Clicked order', orderedProduct);
        const order = {
            name: orderedProduct.name,
            price: orderedProduct.price,
            quantity: 1,
            orderTime: new Date()
        }
        const url = `https://lychee-surprise-09798.herokuapp.com/addOrder`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(response => console.log('Server', response));

            console.log('from home',loggedinUser.email);
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
                                <Nav.Link href="/order">Orders</Nav.Link>
                                <Nav.Link href="/manage">Admin</Nav.Link>
                                <Nav.Link href="#details">Details</Nav.Link>
                                <Link to={"/login"}>
                                    <Button className="btn btn-danger">Login</Button>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row justify-content-center">
                {
                    products.map(product => <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.imageURL} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price:{product.price}$</Card.Text>
                                <Card.Text>Weight:{product.weight}</Card.Text>
                                <Link to={"/order"}>                                
                                    <Button onClick={() => handleOrder(product)} className="btn btn-secondary">Buy Now</Button>
                                    </Link>
                            </Card.Body>
                        </Card>
                    </div>)
                }
            </div>
        </Container>
    );
};

export default Home;