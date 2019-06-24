import React, { Component } from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner'

export default class ItemList extends Component {

    gotService = new gotService();
    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({ charList })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            return (
                <li key={item.id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(item.id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const { charList } = this.state;

        if (!charList) {
            return <Spinner />
        }

        const items = this.renderItems(charList);

        const ItemList = styled.ul`
            cursor: pointer;
            list-group-item {
                cursor: pointer;
            }
        `;

        return (
            <ItemList>
                {items}
            </ItemList>
        );
    }
}