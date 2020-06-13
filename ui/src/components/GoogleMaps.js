import React from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { throws } from 'assert';
import { Modal, Form, Button, Col } from 'react-bootstrap';

import axios from 'axios';


const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 100px)'
};
const kyivCoordinates = {
    lat : 50.431782,
    lng : 30.516382 
};

const home = {
    lat : 50.460273,
    lng : 30.349978
}

class CustomMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen      : false,
            coordinates : props.coordinates,
            message     : props.message
        };
    }

    openInfoWindow = () => {
        console.log('open info window');
        this.setState({ isOpen: false });
        this.setState({ isOpen: true });
    }

    closeInfoWindow = () => {
        console.log('close info window');
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <Marker
                position={this.state.coordinates}
                onClick={this.openInfoWindow}
            >
                {
                    this.state.isOpen && 
                    <InfoWindow onCloseClick={this.closeInfoWindow}>
                        <div>
                            {this.state.message}
                        </div>
                    </InfoWindow>
                }
                
            </Marker>
        )
    }
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin erat sed felis vestibulum lacinia. Praesent scelerisque metus non massa scelerisque aliquam a mattis lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat sapien eget diam suscipit ultricies. In mollis elementum urna eu cursus. Nullam tortor quam, scelerisque in sapien commodo, pretium malesuada urna. Proin quis finibus purus, vitae varius nulla. Donec ac lectus et eros ornare laoreet sit amet sit amet eros. Curabitur cursus odio hendrerit urna vestibulum, eget viverra ipsum vulputate. Proin non neque erat.';

export default class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);

        let currentLat = 0;
        let currentLng = 0;

        this.state = {
            isOpen    : false,
            showModal : false,
            latitude  : 0,
            longitude : 0,
            message   : '',
            marks     : [],
            currentLat,
            currentLng,
        };
    }

    async componentDidMount(prev, cur) {
        const result = await axios.get('http://localhost:8081/api/v1/mapmarks');

        this.setState({
            marks : result.data.data
        });
    }

    onClick = (t) => {
        const { latLng } = t;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState({
            showModal : true,
            latitude  : lat,
            longitude : lng
        });
    }

    renderMarks = () => {
        return (
            this.state.marks.map(mark => (
                <CustomMarker
                    coordinates={mark.coordinates}
                    message={mark.message}
                ></CustomMarker>
            ))
        )
    }

    onMessageChange = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    addMark = async () => {
        // const result = await axios.post('http://localhost:8081/api/v1/mapmarks', {
        //     latitude    : this.state.latitude,
        //     longitude   : this.state.longitude,
        //     message     : this.state.message 
        // });

        // if (!result.data.error) {
        //     this.state.marks.push(result.data.data);
        // }
        this.state.marks.push({
            coordinates : {
                lat : this.state.latitude,
                lng : this.state.longitude
            },
            message : this.state.message
        })
        this.setState({
            message   : '',
            showModal : false 
        });
    }

    render() {
        return (
            <div style={{padding: -64+'px' -32+'px'}}>
                <LoadScript
                    googleMapsApiKey='AIzaSyBF6TsQPEO3KEY3f3FTwzlJO9zOahxpw0w'
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        // center={{lat: this.state.currentLat, lng: this.state.currentLng}}
                        center={kyivCoordinates}
                        zoom={10}
                        onClick={this.onClick}
                        // onLoad={onLoad}
                        // onUnmount={onUnmount}
                    >
                        {this.renderMarks()}
                        {/* <CustomMarker field='value'/> */}
                    </GoogleMap>
                </LoadScript>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create MapMark</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Group controlId="formBasicPassword">
                            <Form.Label>Latitude</Form.Label>
                        <Form.Control type="number" value={this.state.latitude} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="number" value={this.state.longitude} readOnly />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>I...</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Lost</option>
                                <option>Found</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Species</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Cat</option>
                                <option>Dog</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={this.onMessageChange} placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" onChange={this.onMessageChange} placeholder="Color" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" onChange={this.onMessageChange} placeholder="Message" />
                    </Form.Group>
                    <Button variant="link" onClick={this.addMark}>
                            Submit
                    </Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
