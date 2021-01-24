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

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,

    }

    componentDidMount() {
        // axios.get("https://react-app-hamburger-default-rtdb.firebaseio.com/ingredients.json").then(res => {
        //     this.props.onIngredients(res.data);
        // }).catch(error => {
        //     this.setState({error: true});
        // })
    }

    updatePurchaseStatus(ingredient) {
        const sum = Object.keys(ingredient).map(ingKey => {
            return ingredient[ingKey];
        }).reduce((value, el) => {
            return value + el;
        }, 0);

        return sum > 0;
    }

    // TODO: Bu kısımdaki added ve remove ingredients functionlarını redux ile gerçekleştirmen gerekiyor.

    // addedIngredientsHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.props.onIngredients(updatedIngredients);
    //     this.props.onTotalPrice(newPrice);
    //     this.updatePurchaseStatus(updatedIngredients);
    // }
    //
    // removeIngredientsHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const princeRemoving = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const newPrice = oldPrice - princeRemoving;
    //     this.props.onIngredients(updatedIngredients);
    //     this.props.onTotalPrice(newPrice);
    //     this.updatePurchaseStatus(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary;

        let burger = this.state.error ? "The ingredients can't able to" : <Spinner/>;

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls addedIngredients={this.props.onIngredientsAdded}
                                   removeIngredients={this.props.onIngredientsRemoved}
                                   disabled={disabledInfo}
                                   purchase={this.updatePurchaseStatus(this.props.ings)}
                                   ordered={this.purchaseHandler}
                                   price={this.props.totalPrice}/>
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ings} price={this.props.totalPrice}
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
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientsName: ingName}),
        onIngredientsRemoved: (ingName) => dispatch({type: actionTypes.REMOVED_INGREDIENTS, ingredientsName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));