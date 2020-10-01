import React from 'react';
import burgerLogo from '../../Assets/image/burger-logo.png' 
import classes from './Logo.module.css'
const logo =(props) =>
(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='LogoImg'/> 
    </div>
);

export default logo;

