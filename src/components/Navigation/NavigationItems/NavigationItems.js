import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems =(props) =>
(
   <ul className={classes.NavigationItems}>
       <NavigationItem link='/'exact > Burger Builder</NavigationItem>
       {props.isAuth?<NavigationItem link='/Orders'> Orders</NavigationItem>:null}
       {props.isAuth? <NavigationItem link='/logout'> Logout</NavigationItem>:<NavigationItem link='/SignUp'> Login</NavigationItem>}
   </ul>  
);

export default NavigationItems;