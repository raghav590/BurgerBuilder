import React, { Component } from 'react';

import Combine from '../../Hoc/Combine/Combine';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';
import Sidedrawer from '../../components/Navigation/Sidedraw/Sidedrawer'

class layout extends Component{

    state={
        showSidedrawer:false
    }
    
    SidedrawerCloseHandler=()=>
    {
        this.setState((previousState)=>{
            return {showSidedrawer:!previousState.showSidedrawer}
        });
    }

    SidedrawerOpenHandler=()=>
    {
        this.setState({showSidedrawer:false})
    }
    render(){
    return(
        <Combine>
            <Toolbar authenticated={this.props.auth} DrawerToggle={this.SidedrawerCloseHandler}/>
            <Sidedrawer authenticated={this.props.auth} open={this.state.showSidedrawer} closed={this.SidedrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Combine>
    );
    }
} 


const mapStateToProps= state=>{
    return{
        auth:state.auth.tokenId != null
    }
}
export default connect(mapStateToProps)(layout);