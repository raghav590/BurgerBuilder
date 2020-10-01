import * as actiontypes from '../actions/actionsTypes'
import {updateObject} from '../../shared_utility/utility'


const intialState = {
    orders:[],
    loading:false,
    purchased:false
}

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const purchaseBurgerSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        purchased: true,
    } );
};

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer=(state=intialState,action)=>{
    switch(action.type)
    {
        case actiontypes.PURCHASED_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case actiontypes.PURCHASED_BURGER_START:return purchaseBurgerStart(state,action);
        case actiontypes.PURCHASED_BURGER_FAILED:return purchaseBurgerFail(state,action);
        case actiontypes.PURCHASED_INIT:return purchaseInit(state,action);
        case actiontypes.FETCH_ORDER_START:return fetchOrdersStart(state,action);
        case actiontypes.FETCH_ORDER_SUCCESS:return fetchOrdersSuccess(state,action);
        case actiontypes.FETCH_ORDER_FAILED:return fetchOrdersFail(state,action);
        default: return state;

    }
}

export default reducer;