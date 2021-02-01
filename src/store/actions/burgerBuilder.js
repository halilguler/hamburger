import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addedIngredients = (data) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientsName: data,
    }
}

export const removedIngredients = (data) => {
    return {
        type: actionTypes.REMOVED_INGREDIENTS,
        ingredientsName: data,
    }
}

export const setIngredients = (data) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: data
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-app-hamburger-default-rtdb.firebaseio.com/ingredients.json").then(res => {
            const ingredientsData = res.data;
            dispatch(setIngredients(ingredientsData));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        })
    }
}

