import React, {} from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = (props) => {
  const clickedCanceledHandler = () => {
    props.history.goBack("/");
  };

  const clickedContinuedHandler = () => {
    props.history.replace("checkout/contact-data");
  };
  let summary = <Redirect to="/" />;

  if (props.ings) {
    let purchaseRedirect = props.purchased ? <Redirect to={"/"} /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          clickedCanceled={clickedCanceledHandler}
          clickedContinued={clickedContinuedHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
