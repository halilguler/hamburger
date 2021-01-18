import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1,

        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
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
            </div>
        )
    }
}

export default Checkout;