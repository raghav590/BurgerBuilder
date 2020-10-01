 import React, { Component } from 'react';
 import Button from '../../../UI/Button/Button'
 import classes from './ContactData.module.css';
 import axios from '../../../axios-orders'
 import Spinner from '../../../UI/Spinner/Spinner'
 import Input from '../../../UI/Input/Input'
 import {connect} from 'react-redux';
 import withErrorHandler from '../../../Hoc/withErrorHandler/withErrorHandler'
import * as OrderActions from '../../../store/actions/index'
import {updateObject,checkValidity} from '../../../shared_utility/utility'
 class ContactData extends Component{

    state={
        orderForm:
        {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:
                {
                    required:true
                },
                valid:false,
                touched:false        
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your street'
                },
                value:'',
                validation:
                {
                    required:true,

                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zipcodes'
                },
                value:'',
                validation:
                {
                    required:true,
                    minlength:5,
                    maxlength:5,
                   
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your country'
                },
                value:'',
                validation:
                {
                    required:true,
                
                },
                valid:false,
                touched:false
            
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:
                {
                    required:true,
                    isEmail:true
             
                },
                valid:false,
                touched:false
            
            },
            deliverymethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayvalue:'Fastest'},
                        {value:'cheapest',displayvalue:'Cheapest'},
                    ]
                },
                value:'fastest',
                validation:{},
                valid:false,
            
            }

        },
        formIsValid:false,
    }


    inputChangedHandler=(event,inputidentifier)=>
    {
        const updatedFormelement= updateObject(this.state.orderForm[inputidentifier],
            {
                value:event.target.value,
               valid:checkValidity(event.target.value,this.state.orderForm[inputidentifier].validation),
               touched:true,
            } ); 
        const updatedform=updateObject(this.state.orderForm,{
            [inputidentifier]:updatedFormelement
        }) 

        let formisvalid=true;
        for(let inputident in updatedform)
        {
            formisvalid=updatedform[inputident].valid && formisvalid
        }

        this.setState({orderForm:updatedform,formIsValid:formisvalid});
    }
    orderHandler=(event)=>
    {
        event.preventDefault();
        let formData={};
        for(let formElement in this.state.orderForm)
        {
            formData[formElement]=this.state.orderForm[formElement].value;
        }
        const order= {
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
       this.props.onOrderBurger(order,this.props.token);
    }
   
    render()
    {
        const formElement=[];
        for(let key in this.state.orderForm){
            formElement.push(
                {
                    id:key,
                    config:this.state.orderForm[key]
                }
           );
        }
        let form=(<form onSubmit={this.orderHandler}>
            {formElement.map(formElements=>(
                <Input
                        key={formElements.id}
                        elementType={formElements.config.elementType} 
                        elementConfig={formElements.config.elementConfig}
                        value={formElements.config.value}
                        invalid={!formElements.config.valid}
                        shouldValidate={formElements.config.validation}
                        touched={formElements.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElements.id)}
                        />
            ))}

        <Button btntype='Success' disabled={!this.state.formIsValid}>PLACE ORDER</Button>
    </form>);
        if(this.props.loading)
        {
        
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4> Enter Your Contact data </h4>
                {form}
            </div>
        );
    };
 };

 const mapStateToProps= state=>{
    return{
        ings:state.BurgerBuilder.ingredients,
        price:state.BurgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.tokenId,
        userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch=> {
    return{

        onOrderBurger: (orderData,token)=> dispatch(OrderActions.purchaseBurger(orderData,token))
    }

};
 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( ContactData,axios));