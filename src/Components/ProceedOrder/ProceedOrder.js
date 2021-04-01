import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../App";
import { Nav, Navbar, Container, Table } from "react-bootstrap";

const ProceedOrder = () => {
    const [order, setOrder] = useState([]);
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    console.log(setLoggedinUser);

    useEffect(() => {
        fetch('https://lychee-surprise-09798.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setOrder(data));
    }, [loggedinUser.email])
    return (
        <Container>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
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
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                order.map(eachOrder =>
                                    <tr>
                                        <td>{eachOrder.name}</td>
                                        <td>{eachOrder.price}</td>
                                        <td>{eachOrder.quantity}</td>
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

export default ProceedOrder;