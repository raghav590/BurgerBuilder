import * as actionTypes from '../actions/actionsTypes';
import axios from 'axios';


export const authStart=()=>
{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(userId,tokenId)=>
{
    return{
        type:actionTypes.AUTH_SUCCESS,
        userId:userId,
        tokenId:tokenId
    }
}

export const authLogout=()=>
{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const tokenExpire=(expireIn)=>
{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(authLogout())
        },expireIn*1000);
    };
};
export const authFailed=(error)=>{
    return {
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}

export const setRedirectPath=(path)=>
{
    return{
        type:actionTypes.SET_REDIRECT_PATH,
        path:path
    }
}

export const auth=(email,password,signIn)=>{

    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7jPLVaGkM0tKRvD1HS9nXpb2F1MZ7blw'
        if(signIn)
        {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7jPLVaGkM0tKRvD1HS9nXpb2F1MZ7blw'
        }
        axios.post(url,authData)
        .then(res=>{
            const expirationDate=new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('userId',res.data.localId);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(res.data.localId,res.data.idToken));
            dispatch(tokenExpire(res.data.expiresIn));
        })
        .catch(err =>{
            dispatch(authFailed(err.response.data.error.message))
        })
    }

}

export const checkAuthState=()=>{
    return dispatch=>{
        let token=localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date())
            {
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(userId,token));
                dispatch(tokenExpire((expirationDate.getTime() - new Date().getTime())/1000))
            }
            else
            {
                dispatch(authLogout());
            }
        }
    }

}