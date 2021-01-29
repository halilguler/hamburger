import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === "price") {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //
    //     }
    //     this.setState({ingredients: ingredients});
    //     this.setState({price: price});
    // }

    clickedCanceledHandler = () => {
        this.props.history.goBack("/");
    };

    clickedContinuedHandler = () => {
        this.props.history.replace("checkout/contact-data");
    };

    render() {
        let summary = <Redirect to="/"/>;

        if (this.props.ings) {
            let purchaseRedirect = this.props.purchased ? <Redirect to={"/"}/> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        clickedCanceled={this.clickedCanceledHandler}
                        clickedContinued={this.clickedContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);
