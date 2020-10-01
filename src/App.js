import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout'
import {Route, Switch,withRouter,Redirect} from 'react-router-dom'
import Orders from './containers/orders/orders'
import Auth from '../src/containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onCheckAuthState();
  }

 
  

  render () {
    

    let routes=(
      <Switch>
        <Route path="/SignUp" component={Auth}/>
        <Route path="/"  exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
      if(this.props.isAuthenticated)
      {
        routes=(
        <Switch>
          <Route path="/checkout" component={Checkout}/> 
          <Route path="/Orders" component={Orders}/>
          <Route path="/SignUp" component={Auth}/>
          <Route path="/"  exact component={BurgerBuilder}/>
          <Route path='/logout' component={Logout}/>
            <Redirect to="/"/>
        </Switch>
        );
      }
    return (
      <div>
        <Layout>
            {routes}
         </Layout>
      </div>
    );
  }
}

const mapStateToProps= state =>{
  return{
    isAuthenticated:state.auth.tokenId!== null
  }
}
const mapDispatchToProps = dispatch=>{
  return{
     onCheckAuthState: ()=>dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
