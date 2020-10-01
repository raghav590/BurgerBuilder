import React, { Component } from 'react'
import classes from './Modal.module.css'
import Combine from '../../Hoc/Combine/Combine'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{


    shouldComponentUpdate(nextProps,nextState)
    {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render()
    {
        return(
            <Combine>
                <Backdrop show={this.props.show} clicked={this.props.closehandler}/>
            <div className={classes.Modal}
            style={{
                transform: this.props.show ? 'translate(0)':'translateY(-100vh)',
                opacity : this.props.show ? '1' : '0'
    
            }}>
                {this.props.children}
               
            </div>
            </Combine>
        )
    }
    
};

export default Modal;