import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStarts = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStarts());
        axios
            .post("/order.json", orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: order,
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    }
}

export const fetchOrder = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get("/order.json?auth=" + token).then(res => {
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key});
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
}