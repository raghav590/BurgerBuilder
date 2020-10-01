import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../checkout/ContactData/ContactData';
import {connect} from 'react-redux'

class Checkout extends Component{



   checkoutCanceledHandler= ()=>{
       console.log('clicked!!')
    this.props.history.goBack();
   }

   
   checkoutContinueHandler= ()=>{
    this.props.history.replace('/checkout/contact-data');
    }
render()
{
    let summary=<Redirect to="/"/>
    if(this.props.ings)
    {
        const purchaseRedirect =this.props.purchase ? <Redirect to='/'/>:null;

        summary=(
            <div>
                {purchaseRedirect}
      <CheckoutSummary ingredients={this.props.ings}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinue={this.checkoutContinueHandler}
            />
             <Route path={this.props.match.path + '/contact-data'}
            component={ContactData}
             />
            </div>
        );
    }
    return summary;
};
}
const mapStateToProps= state=>{
    return{
        ings:state.BurgerBuilder.ingredients,
        purchase:state.order.purchased
    }
}




export default connect(mapStateToProps)(Checkout);