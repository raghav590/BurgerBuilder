import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom'
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner'
import {updateObject,checkValidity} from '../../shared_utility/utility'
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signIn:true,
    }

    

    inputChangedHandler = (event, controlName) => {

        const updatedControls=updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],
                {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                })
        });
        this.setState({controls: updatedControls});
    }

    switchSignInHander=()=>{
        this.setState((prevState)=> {
            return{
                signIn:!prevState.signIn
            }
       
        });
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.signIn);
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        let redirect=null;
        if(this.props.isAuth)
        {
            if(!this.props.buildingBruger && this.props.redirectPath!=="/")
            {
                this.props.onSetRedirectPath()
            }

             redirect=<Redirect to={this.props.redirectPath}/>
        }
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );
            if(this.props.loading){
                form=<Spinner/>
            }
            let errorMessage=null;
            if(this.props.error){
                errorMessage=<p>{this.props.error}</p>
            }
        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btntype="Success">SUBMIT</Button>

                </form>
                <Button
        clicked={this.switchSignInHander} 
        btntype="Danger">Switch to {this.state.signIn? 'SignUp' :'SignIn'}
        </Button>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.tokenId !==null,
        buildingBruger:state.BurgerBuilder.building,
        redirectPath:state.auth.redirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,signIn) => dispatch(actions.auth(email, password,signIn)),
        onSetRedirectPath:()=>dispatch(actions.setRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);