import * as actiontypes from '../actions/actionsTypes'
import {updateObject} from '../../shared_utility/utility'

const intialState = {
    userId:null,
    tokenId:null,
    loading:false,
    error:null,
    redirectPath:"/"
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        tokenId: action.tokenId,
        userId: action.userId,
        error: null,
        loading: false
     } );
};
const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { tokenId: null, userId: null,loading:false });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { redirectPath: action.path })
}

const reducer=(state=intialState,action)=>{

    switch(action.type){

        case actiontypes.AUTH_START: return authStart(state,action)
        case actiontypes.AUTH_SUCCESS: return authSuccess(state,action)
        case actiontypes.AUTH_FAILED:return authFail(state,action)
        case actiontypes.AUTH_LOGOUT:return authLogout(state,action)
        case actiontypes.SET_REDIRECT_PATH: return setAuthRedirectPath(state,action)
            default: return state;

    }
}

export default reducer;