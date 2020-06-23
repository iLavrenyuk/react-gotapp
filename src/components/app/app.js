import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMassage from '../errorMassage';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';
import gotService from '../../services/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Alert } from 'reactstrap';



class Home extends Component {
    render() {
        return(
            <Alert color="info">
            Hi!
            <br/>
            <br/>
            Top right select the desired column.
            <br/>
            (Cправа вверху выберите желаемую графу.)
            </Alert>
        )
    }
}



export default class App extends Component {

    gotService = new gotService();
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
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                <Button
                                    color="primary"
                                    onClick={this.change}
                                >hide/show</Button>
                                {blockChange}
                            </Col>
                        </Row>
                        <Route path='/' exact component={Home} />
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/houses' component={HousesPage} />
                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({ match }) => {
                                const { id } = match.params;
                                return <BooksItem bookId={id} />
                            }
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
};