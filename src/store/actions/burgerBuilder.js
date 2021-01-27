import * as actionTypes from './actionTypes';

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