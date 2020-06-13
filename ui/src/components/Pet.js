import React from 'react';
import {
    Jumbotron,
    Card,
    Image,
    Col,
    Row
} from 'react-bootstrap'

export default class Pet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Jumbotron>
                <Row>
                    <Col>
                        <Image src="https://cdn.akc.org/content/hero/puppy_pictures_header.jpg" rounded width={'100%'}/>
                    </Col>
                    <Col>
                       <h3>Teddy</h3>
                       <p>Good boy is looking for home.</p>
                       <h4>Summary</h4>
                       <p>Summary</p>
                       <p>Curator number: +1234567890.</p>
                       <p>Located at "UrbanPup".</p>
                    </Col>
                </Row>
            </Jumbotron>
                // <Card>
                //     <Card.Body>
                //         <Card.Img variant="top" src="https://cdn.akc.org/content/hero/puppy_pictures_header.jpg" style={{height: '50%', width: '50%'}}/>
                //         <Card.Title style={{ padding: 15+'px' }}>Teddy</Card.Title>
                //         <Card.Text>
                //             asd
                //         </Card.Text>
                //         <Card.Footer>
                //             Sirius
                //             {/* {this.state.shelterName} */}
                //         </Card.Footer>
                //     </Card.Body>
                // </Card>
        )
    }
}