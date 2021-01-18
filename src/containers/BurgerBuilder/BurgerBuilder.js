import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseStatus: false,
        purchasing: false,
        loading: false,
        error: false,

    }

    componentDidMount() {
        axios.get("https://react-app-hamburger-default-rtdb.firebaseio.com/ingredients.json").then(res => {
            this.setState({ingredients: res.data});
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

    addedIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStatus(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const princeRemoving = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - princeRemoving;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStatus(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         address: {
        //             country: "Turkey",
        //             street: "Istanbul",
        //             zipCode: "34750",
        //         },
        //         deliveryMethod: "fastest",
        //     }
        // }
        //
        // axios.post("/order.json", order).then(response => {
        //
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // }).finally(() => {
        //     this.setState({loading: false, purchasing: false});
        // });
        //alert('Continue');

        let queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString,
        });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary;

        let burger = this.state.error ? "The ingredients can't able to" : <Spinner/>;

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls addedIngredients={this.addedIngredientsHandler}
                                   removeIngredients={this.removeIngredientsHandler}
                                   disabled={disabledInfo}
                                   purchase={this.state.purchaseStatus}
                                   ordered={this.purchaseHandler}
                                   price={this.state.totalPrice}/>
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);