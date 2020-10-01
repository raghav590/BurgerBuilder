import * as actiontypes from '../actions/actionsTypes'
import {updateObject} from '../../shared_utility/utility'

const intialState = {
    ingredients:null,
    totalPrice: 40,
    error:false,
    building:false
}

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 60,
    bacon: 10
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientsName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientsName],
        building: true
    }
    return updateObject( state, updatedState );
};

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 40,
        error: false,
        building: false
    } );
};


const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};
const reducer=(state=intialState,action)=>{

    switch(action.type){

        case actiontypes.ADD_INGREDIENT:return addIngredient(state,action);                     
        case actiontypes.REMOVE_INGREDIENT: return removeIngredient(state,action); 
        case actiontypes.SET_INGREDIENTS: return setIngredients(state,action);      
        case actiontypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action);     
        default: return state;
    }

}

export default reducer;