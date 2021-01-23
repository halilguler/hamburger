import * as actionTypes from '../actions/burger';

const initialState = {
    ingredients: null,
    totalPrice: 4,
}

// TODO: Bu kısımda addIngredient ve RemoveIngredient kısımlarını redux olarak geliştirmelisin.

const burger = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INGREDIENTS:
            const newIngredients = action.data;
            return {...state, ingredients: newIngredients}
        case actionTypes.TOTAL_PRICE:
            const newTotalPrice = action.data;
            return {...state, totalPrice: newTotalPrice}
    }
    return state;
}

export default burger;