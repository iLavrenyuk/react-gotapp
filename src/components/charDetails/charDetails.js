import React, { Component } from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMassage from '../errorMassage';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export { Field };

export default class ItemDetails extends Component {

    gotService = new gotService();
    state = {
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    onError = (err) => {
        this.setState({
            error: true
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId } = this.props;
        if (!itemId) {
            return;
        }

        const { getData } = this.props;

        getData(itemId)
            .then((item) => {
                this.setState({ item })
            })
            .catch(this.onError);
    }

    render() {

        const ItemDetails = styled.div`
            rounded;
            background-color: #fff;
            padding: 25px 25px 15px 25px;
            margin-bottom: 40px;
                h4 {
                    margin-bottom: 20px;
                    text-align: center;
                }
        `;

        const SelectError = styled.span`
            color: #fff;
            text-align: center;
            font-size: 26px;
        `;

        const { item, error } = this.state;

        if (!item) {
            return <SelectError>Please select a character</SelectError>
        }

        const CharViev = ({ item }) => {
            const { name } = item;

            return (
                <>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item })
                            })
                        }
                    </ul>
                </>
            );
        }

        const errorMassage = error ? <ErrorMassage /> : <CharViev item={item} />;

        return (
            <ItemDetails>
                {errorMassage}
            </ItemDetails>
        );
    }
}

