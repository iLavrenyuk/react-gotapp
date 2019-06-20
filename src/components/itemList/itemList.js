import React, { Component } from 'react';
import styled from 'styled-components';

export default class ItemList extends Component {

    render() {

        const ItemList = styled.ul `
            cursor: pointer;
            list-group-item {
                cursor: pointer;
            }
        `;

        return (
            <ItemList>
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ItemList>
        );
    }
}