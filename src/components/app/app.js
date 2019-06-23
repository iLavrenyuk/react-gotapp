import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';


export default class App extends Component {

    state = {
        block: true
    }

    change = () => {
        if (this.state.block) {
            this.setState({ block: false })
        } else {
            this.setState({ block: true })
        }
    }

    render() {
        const blockChange = this.state.block ? <RandomChar /> : null;
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            <Button
                                color="primary"
                                onClick={this.change}
                            >Показать/Скрыть</Button>
                            {blockChange}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
                <div>{GotService}
                </div>
            </>
        );
    }

};