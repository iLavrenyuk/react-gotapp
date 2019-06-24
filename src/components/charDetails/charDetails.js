import React, { Component } from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMassage from '../errorMassage';

export default class CharDetails extends Component {

    gotService = new gotService();
    state = {
        char: null,
        error: false
    }


    onError = (err) => {
        this.setState({
            error: true
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({ char })
            })
            .catch(this.onError);
    }

    render() {

        const CharDetails = styled.div`
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

        const { char, error } = this.state;

        if (!char) {
            return <Spinner />
        }

        if (!this.state.char) {
            return <SelectError>Please select a character</SelectError>
        }
        const errorMassage = error ? <ErrorMassage /> : <CharViev char={char} />;

        return (
            <CharDetails>
                {errorMassage}
            </CharDetails>
        );
    }
}

const CharViev = ({ char }) => {
    const { name, gender, born, died, culture } = char;

    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
}