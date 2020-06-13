import React from 'react';
import { Card } from 'react-bootstrap';

export default class PetPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.id ? props.id : 0,
            name : props.name ? props.name : 'No name',
            description : props.description ? props.description : 'No desc',
            shelterName : props.shelterName ? props.shelterName : 'No shelter',
            image : props.image
        };
    }

    buildDesription(str) {
        if (str.length > 40) return `${str.slice(0, 40)}...`
        return str;
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Img variant="top" src={this.state.image} style={{ height: 200+'px'}} />
                    <Card.Title style={{ padding: 15+'px' }}>{this.state.name}</Card.Title>
                    <Card.Text>
                        {this.buildDesription(this.state.description)}
                    </Card.Text>
                    <Card.Footer>
                        {this.state.shelterName}
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}