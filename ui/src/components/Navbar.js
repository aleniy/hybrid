import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

import SheltersList from './SheltersList';
import Shelter from './Shelter';
import PetsList from './PetsList';
import Pet from './Pet';
import GoogleMaps from './GoogleMaps';  
import Chart from './Charts';

import { Navbar, Nav, Form, FormControl, Button, Modal, Col } from 'react-bootstrap'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import axios from 'axios';

export default class MyNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showRegisterModal : false,
            loggedIn          : false,
            email    : '',
            password : '',
            username : ''
        };
    }

    onEmailChange = e => {
        this.setState({
            email : e.target.value
        });
    }

    onPasswordChange = e => {
        this.setState({
            password : e.target.value
        });
    }

    onUsernameChange = e => {
        this.setState({
            username : e.target.value
        });
    }

    logIn = () => {
        this.setState({
            loggedIn : true
        });
    }

    logOut = () => {
        this.setState({
            loggedIn : false
        });
    }

    register = async () => {
        try {
            const result = await axios.post('http://localhost:8081/api/v1/user/register', { ...this.state });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        console.log(this.state)
    }

    renderNavbarRight() {
        if (!this.state.loggedIn) {
            return (
                <Form inline>
                    <FormControl type="text" placeholder="login" className="mr-sm-2" />
                    <FormControl type="password" placeholder="password" className="mr-sm-1" />
                    <Button variant="link" onClick={() => this.logIn()}>Log in</Button>
                    <Button
                        variant="link"
                        onClick={() => this.setState({ showRegisterModal: true })}
                    >Register</Button>
                </Form>
            );
        } else {
            return (
                <Form inline>
                    <Button variant='link'>Profile</Button>
                    <Button
                        variant='link'
                        onClick={this.logOut}
                        size="25%"
                    >Log out</Button>                    
                </Form>
            )
        }
    }

    render() {
        return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={NavLink} to='/'> Home </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link as={NavLink} to="/">
                                Home
                            </Nav.Link> */}
                            <Nav.Link as={NavLink} to="/shelters">
                                    Hybrids
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/chart">
                                    CarSales
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/123">
                                    FuelSales 
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/map">
                                    Pollutions 
                            </Nav.Link>
                            {/* <Nav.Link as={NavLink} to="/chart">
                                    chart
                            </Nav.Link> */}
                        </Nav>
                        {this.renderNavbarRight()}
                    </Navbar.Collapse>
                </Navbar>
                {/* <Jumbotron> */}
                    <Switch>
                        <Route path="/shelters" component={SheltersList}></Route>
                        <Route path="/pet/:id" component={Pet}></Route>
                        <Route path="/pets" component={PetsList}></Route>                        
                        <Route path="/shelter/:id" component={Shelter}></Route>
                        <Route path="/map" component={GoogleMaps}></Route>
                        <Route path="/chart" component={Chart}></Route>
                        <Route path='/'>
                            This project is created to help with adoption and searchong of lost pets
                        </Route>
                    </Switch>
                {/* </Jumbotron> */}
            </div>
            <Modal
                show={false}
                // show={this.state.showRegisterModal}
                onHide={() => this.setState({ showRegisterModal: false })}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={this.onEmailChange} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={this.onPasswordChange} placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password retype</Form.Label>
                            <Form.Control type="password" onChange={this.onPasswordChange} placeholder="Password retype" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={this.onUsernameChange} placeholder="Username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" onChange={this.onUsernameChange} placeholder="Username" />
                        </Form.Group>
                        {/* <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" defaultValue="User">
                                <option>User</option>
                                <option>Shelter</option>
                            </Form.Control>
                            </Form.Group>
                        </Form.Row> */}
                        <Button variant="primary" onClick={this.register}>
                            Sign up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <MDBContainer>
            <MDBModal
                isOpen={this.state.showRegisterModal}
            >
            {/* <MDBModalHeader toggle={() => {this.setState({showRegisterModal:false})}}>Sign in</MDBModalHeader> */}
                <MDBModalBody>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <form>
                                <div className="grey-text">
                                {/* <MDBInput label="Email" icon="envelope" group type="text" validate error="wrong"
                                    success="right" /> */}
                                <MDBInput label="Login" icon="user-circle" group type="text" validate error="wrong"
                                    success="right" />
                                {/* <MDBInput label="Name" icon="user" group type="text" validate error="wrong"
                                    success="right" /> */}
                                <MDBInput label="Password" icon="lock" group type="password" validate />
                                {/* <MDBInput label="Retype password" icon="lock" group type="password" validate /> */}
                                </div>
                                <div className="text-center">
                                <MDBBtn color="secondary" outline>Sign in</MDBBtn>

                                <MDBBtn color="warning" outline>Cancel</MDBBtn>
                                </div>
                            </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
            </MDBModal>
            </MDBContainer>
        </Router>
        )
    }
}