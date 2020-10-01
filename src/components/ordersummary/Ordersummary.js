import React from 'react'
import Button from '../../UI/Button/Button'

const Ordersummary=(props)=> {

    const orderList=Object.keys( props.ingredients )
    .map( igKey => {
    return <li key={igKey}>
        <span style={{textTransform: 'capitalize '}}>
        {igKey}
        </span> : {props.ingredients[igKey]}
        </li>;
    });

    return(
        <div>
            <h1>Order Summary!</h1>
        <h3>Here is you Delicous Burger with following:</h3>
        {orderList}
        <h4>Are you sure, wanna checkout?</h4>
        <h2>Price : <strong>INR {props.price}</strong></h2>
        <Button btntype='Danger' clicked={props.cancel}>Cancel</Button>
         <Button btntype='Success' clicked={props.continue}>Continue</Button>
        </div>

    );

};

export default Ordersummary;