import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions/burger';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        purchaseStatus: false,
        purchasing: false,
        loading: false,
        error: false,

    }

    componentDidMount() {
        axios.get("https://react-app-hamburger-default-rtdb.firebaseio.com/ingredients.json").then(res => {
            this.props.onIngredients(res.data);
        }).catch(error => {
            this.setState({error: true});
        })
    }

    updatePurchaseStatus(ingredient) {
        const sum = Object.keys(ingredient).map(ingKey => {
            return ingredient[ingKey];
        }).reduce((value, el) => {
            return value + el;
        }, 0);

        this.setState({purchaseStatus: sum > 0});
    }

    // TODO: Bu kısımdaki added ve remove ingredients functionlarını redux ile gerçekleştirmen gerekiyor.

    addedIngredientsHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.props.onIngredients(updatedIngredients);
        this.props.onTotalPrice(newPrice);
        this.updatePurchaseStatus(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const princeRemoving = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice - princeRemoving;
        this.props.onIngredients(updatedIngredients);
        this.props.onTotalPrice(newPrice);
        this.updatePurchaseStatus(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        let queryParams = [];
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push("price=" + this.props.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString,
        });
    }


    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary;

        let burger = this.state.error ? "The ingredients can't able to" : <Spinner/>;

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls addedIngredients={this.addedIngredientsHandler}
                                   removeIngredients={this.removeIngredientsHandler}
                                   disabled={disabledInfo}
                                   purchase={this.state.purchaseStatus}
                                   ordered={this.purchaseHandler}
                                   price={this.props.totalPrice}/>
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice}
                                         purchaseCanceled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler}/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.state.purchasing}
                       clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredients: (data) => dispatch({type: actionTypes.INGREDIENTS, data}),
        onTotalPrice: (data) => dispatch({type: actionTypes.TOTAL_PRICE, data}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));