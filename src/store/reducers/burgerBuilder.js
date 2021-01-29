import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            const updateIngredients = {
                [action.ingredientsName]:
                state.ingredients[action.ingredientsName] + 1
            }
            const updateIngredient = updateObject(state.ingredients, updateIngredients);
            const updateState = {
                ingredients: updateIngredient,
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.ingredientsName],
            }
            return updateObject(state, updateState);
        case actionTypes.REMOVED_INGREDIENTS:
            const updateIngs = {
                [action.ingredientsName]:
                state.ingredients[action.ingredientsName] - 1
            }
            const updateIng = updateObject(state.ingredients, updateIngs);
            const updateSt = {
                ingredients: updateIng,
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.ingredientsName],
            }
            return updateObject(state, updateSt);
        case actionTypes.SET_INGREDIENTS:
            const updateStated = {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
            }
            return updateObject(state, updateStated);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
    }
    return state;
}

export default burgerBuilder;
