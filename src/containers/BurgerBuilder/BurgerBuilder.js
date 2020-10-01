import React, { Component } from 'react';
import Combine from '../../Hoc/Combine/Combine';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import Ordersummary from '../../components/ordersummary/Ordersummary';
import axios from '../../axios-orders'
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from'../../Hoc/withErrorHandler/withErrorHandler';
import * as BurgerBuilderActions from '../../store/actions/index'
import {connect} from 'react-redux';


class BurgerBuilder extends Component {
    
    state = {
        purchasing:false,
    }

    componentDidMount( )
    {
  
            this.props.onInitIngredients();
     
    }

    updatePurchaseState () {
        const sum = Object.keys( this.props.ings )
            .map( igKey => {
                return this.props.ings[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return  sum > 0;
    }
    purchaseHandler=()=>
    {
        if(this.props.isAuthenticated)
        {
            this.setState({purchasing : true});    
        }
        else
        {
            this.props.onSetRedirectPath("/checkout")
            this.props.history.push("/SignUp")
        }
    }

    purchasecancelHandler=()=>
    {

        this.setState({purchasing : false});
    }
    purchaseContinueHandler=()=>
    {
        // alert("thanks for ordering!!");
        this.props.onInitPurchased()
        this.props.history.push('/checkout');
    }
    

    render () {
        let disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary=null;

 

        let burger=this.props.error ?<p>Sorry !! Ingredients can't be loaded</p>: <Spinner/> 
        if(this.props.ings)
        {
            burger=(
            <Combine>
            <Burger ingredients={this.props.ings} />
            <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientsRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            price={this.props.price} 
            isAuth={this.props.isAuthenticated}
            orderClicked={this.purchaseHandler}/>
            </Combine>
            );
            orderSummary= <Ordersummary ingredients={this.props.ings}
            continue={this.purchaseContinueHandler}
            cancel={this.purchasecancelHandler}
            price={this.props.price}
                />

        }

        // {salad: true, meat: false, ...}
        return (
            <Combine>
                
                <Modal show={this.state.purchasing}  closehandler ={this.purchasecancelHandler}>
                    
                    {orderSummary}
                    
                </Modal>
               {burger}
            </Combine>
        );
    }
}
const mapStateToProps=state =>{
return {
    ings:state.BurgerBuilder.ingredients,
    price:state.BurgerBuilder.totalPrice,
    error:state.BurgerBuilder.error,
    isAuthenticated:state.auth.tokenId !==null
};
}



const mapDispatchToProps= dispatch =>{
    return{
        onIngredientsAdded: (ingName)=> dispatch(BurgerBuilderActions.addIngredients(ingName)),
        onIngredientsRemoved: (ingName)=> dispatch(BurgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients:()=>dispatch(BurgerBuilderActions.initIngredients()),
        onInitPurchased:()=>dispatch(BurgerBuilderActions.purchaseinit()),
        onSetRedirectPath:(path)=>dispatch(BurgerBuilderActions.setRedirectPath(path)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));