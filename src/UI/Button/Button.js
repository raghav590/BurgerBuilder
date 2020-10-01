import React from 'react'
import classes from './Button.module.css'

const Button = (props) => ( 
<button className={[classes.Button,classes[props.btntype]].join(' ')}
onClick={props.clicked}
disabled={props.disabled}>
   <strong>{props.children}</strong> 
</button>

);


export default Button;