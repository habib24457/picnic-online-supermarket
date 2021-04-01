import React, { useState,  useContext } from 'react';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import { Link,useHistory, useLocation, } from "react-router-dom";
import { UserContext } from "../../App";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}




const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/home" } };
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);

    console.log(loggedinUser);

    /**Sign in with google */
    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setUser(signedInUser);
                setLoggedinUser(signedInUser);
                 history.replace(from);
            }).catch((error) => {
                console.log(error);
            });
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
                                <h5>{user.name}</h5>
                                <Link to="/home">
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row justify-content-center">
                <Button className="btn btn-danger" onClick={handleSignIn}>Signin with Google</Button>
            </div>

        </Container>
    );
};

export default Login;