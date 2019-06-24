import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMassage from '../errorMassage';
import CharacterPage from '../characterPage';


export default class App extends Component {

    state = {
        block: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
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

        if (this.state.error) {
            return <ErrorMassage />
        }

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
                    <CharacterPage />
                </Container>
            </>
        );
    }

};