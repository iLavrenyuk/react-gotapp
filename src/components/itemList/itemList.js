import React, { Component } from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';

export default class ItemList extends Component {

    gotService = new gotService();
    state = {
        charList: null
    }

    componentDidMount() {
        const { getData } = this.props

        getData()
            .then((itemList) => {
                this.setState({ itemList })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label  = this.props.renderItem(item);

            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList } = this.state;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList);

        const ItemsList = styled.ul`
            cursor: pointer;
            list-group-item {
                cursor: pointer;
            }
        `;

        return (
            <ItemsList>
                {items}
            </ItemsList>
        );
    }
}