import React, { Component } from 'react';
import gotService from '../../services/gotService';
import ItemDetails, { Field } from '../charDetails';

export default class BooksItem extends Component {
    gotService = new gotService();


    state = {
        selectedBook: 3
    }

    render() {
        return (
            <ItemDetails
                itemId={this.props.bookId}
                getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}