import React from 'react';
import classes from './Input.module.css'

const Input =(props)=>{

    const inputClasses=[classes.InputElement];
    if(props.invalid&& props.shouldValidate && props.touched)
    {
        inputClasses.push(classes.Invalid)
    }

    let inputElement=null;
    switch(props.elementType)
    {
        case('input'): inputElement=<input className={inputClasses.join(' ')} 
                                onChange={props.changed}
                                {...props.elementConfig} 
                                value={props.value}/>
                        break;
        case('textarea'):inputElement=<textarea className={inputClasses.join(' ')} 
                            onChange={props.changed}
                            {...props.elementConfig}
                            value={props.value}/>
                          break;
        case('select'):inputElement=<select 
                            className={inputClasses.join(' ')} 
                            value={props.value}
                            onChange={props.changed}>    
                            {props.elementConfig.options.map(option=>
                                (   
                                    <option key={option.value} value={option.value}>{option.displayvalue}</option>
                                ))};          
                                    </select>
                break;
        default:
            inputElement=<input  className={classes.Input} {...props.elementConfig} value={props.value} />
    }
return(
<div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {inputElement}

</div> 
);
}

export default Input;