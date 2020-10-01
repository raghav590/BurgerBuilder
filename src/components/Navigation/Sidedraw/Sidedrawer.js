import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedrawer.module.css'
import Backdrop from'../../../UI/Backdrop/Backdrop'
import Combine from '../../../Hoc/Combine/Combine'

const Sidedrawer=(props) =>{

    let attacheclasses=[classes.Sidedrawer,classes.close];
    if(props.open){
        attacheclasses=[classes.Sidedrawer,classes.open];
    }
    return (

        <Combine>
                    <Backdrop show={props.open} clicked={props.closed} ></Backdrop>
        <div className={attacheclasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>  <Logo /></div>
       
            <nav>
                <NavigationItems isAuth={props.authenticated}/>
            </nav>
        </div>
        </Combine>

        

    );
};

export default Sidedrawer;