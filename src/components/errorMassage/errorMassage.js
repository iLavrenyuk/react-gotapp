import React from 'react';
import './errorMassage.css'
import img from './error.jpg';

const ErrorMassage = () => {
    return (
        <>
            <img src={img} alt='error' className='random-block'></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMassage;