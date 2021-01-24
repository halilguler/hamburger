import * as actionTypes from '../actions/burger';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

// TODO: Bu kısımda addIngredient ve RemoveIngredient kısımlarını redux olarak geliştirmelisin.

const burger = (state = initialState, action) => {
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
    }
    return state;
}

export default burger;