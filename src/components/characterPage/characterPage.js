import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMassage from '../errorMassage';

export default class CharacterPage extends Component {

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMassage />
        }

        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected} />
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar} />
                </Col>
            </Row>
        )
    }
}