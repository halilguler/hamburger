import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0,
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === "price") {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({ingredients: ingredients});
        this.setState({price: price});
    }

    clickedCanceledHandler = () => {
        this.props.history.goBack('/');
    }

    clickedContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    clickedCanceled={this.clickedCanceledHandler}
                    clickedContinued={this.clickedContinuedHandler}/>
                <Route path={this.props.match.path + "/contact-data"}
                       render={(props) => (<ContactData ingredients={this.state.ingredients}
                                                        totalPrice={this.state.price} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;