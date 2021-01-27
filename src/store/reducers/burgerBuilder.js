import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}


const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientsName],
            }
        case actionTypes.REMOVED_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientsName],
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }
    }
    return state;
}

export default burgerBuilder;