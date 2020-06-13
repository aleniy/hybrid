import React from 'react';
import { 
    CardDeck,
    Jumbotron,
    Dropdown,
    InputGroup,
    Button,
    Form,
    Modal,
    Col,
    DropdownItem
} from 'react-bootstrap';
import PetPreview from './PetPreview';
// import DropdownItem from 'react-bootstrap/DropdownItem';

export default class PetsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal   : false,
            name        : '',
            description : '',
            male        : ''
        };
    }

    onFormSubmit = () => {
        this.setState({
            showModal : false
        });
    }

    render() {
        return (
            <Jumbotron>
                <InputGroup>
                    <Dropdown style={{ padding: '0px 0px 15px 0px', margin: '-35px 0px 0px 0px' }}>
                        <Dropdown.Toggle variant="link">Species</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Cat</Dropdown.Item>
                            <Dropdown.Item>Dog</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{ padding: '0px 0px 15px 0px', margin: '-35px 0px 0px 0px' }}>
                        <Dropdown.Toggle variant="link">City</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <DropdownItem>Kyiv</DropdownItem>
                            <DropdownItem>Odessa</DropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{ padding: '0px 0px 15px 0px', margin: '-35px 0px 0px 0px' }}>
                        <Dropdown.Toggle variant="link">Shelter</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <DropdownItem>Sirius</DropdownItem>
                            <DropdownItem>UrbanPup</DropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>

                <InputGroup style={{ padding: '0px 0px 15px 0px', margin: '-15px 0px 0px 0px' }}>
                    <Button style={{textAlign: 'right'}} variant="link" onClick={() => this.setState({ showModal: true })}>
                        Add pet profile
                    </Button>
                </InputGroup>

                <CardDeck>
                    <PetPreview
                        id='1'
                        name='Oreo'
                        description='Looking for home'
                        shelterName='Sirius'
                        image='https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    />
                    <PetPreview
                        id='2'
                        name='Simba'
                        description='Looking for home'
                        shelterName='Sirius'
                        image='https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*'
                    />
                    <PetPreview
                        id='3'
                        name='Teddy'
                        description='Looking for home'
                        image='https://cdn.akc.org/content/hero/puppy_pictures_header.jpg'
                        shelterName='UrbanPup'
                    />
                </CardDeck>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add pet profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Row>
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
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={this.onMessageChange} placeholder="Description" />
                    </Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Pet image" />

                    <Button variant="link" onClick={this.onFormSubmit}>
                            Submit
                    </Button>
                    </Modal.Body>
                </Modal>
            </Jumbotron>
            
        )
    }
}