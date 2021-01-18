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