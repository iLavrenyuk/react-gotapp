import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMassage from '../errorMassage';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component {

    gotService = new gotService();
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMassage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(`/books/${itemId}`)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => name} />
        )
    }
}

export default withRouter(BooksPage);