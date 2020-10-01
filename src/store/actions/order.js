import * as actionTypes from '../actions/actionsTypes'
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(id,orderData)=>
{
    return{
        type:actionTypes.PURCHASED_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed=(error)=>{
 return{
     type:actionTypes.PURCHASED_BURGER_FAILED,
     error:error
 }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASED_BURGER_START
    }
}

export const purchaseinit=()=>{
    return{
        type:actionTypes.PURCHASED_INIT
    }
}

export const fetchOrderSuccess=(orderData)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orderData
    }
}

export const fetchOrderFailed=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAILED,
        error:error
    }
}

export const fetchOrderStart=()=>{
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders=(token,userId)=>{
return dispatch=> {
    dispatch(fetchOrderStart());
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    axios.get('/orders.json'+queryParams)
    .then(res => {
        const fetchorders=[];
        for(let key in res.data){
            fetchorders.push({
                ...res.data[key],
                id : key
            });
        }
        dispatch(fetchOrderSuccess(fetchorders));
        
    })
    .catch(error=>{
       dispatch(fetchOrderFailed(error))
    });

    }
}
export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then(response => {
         
            dispatch(purchaseBurgerSuccess(response.data,orderData))
        })
        .catch(error =>
            {
                dispatch(purchaseBurgerFailed(error));
            });
    }
}