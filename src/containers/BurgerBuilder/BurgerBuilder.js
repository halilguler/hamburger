import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions";

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseStatus = (ingredient) => {
    const sum = Object.keys(ingredient)
      .map((ingKey) => {
        return ingredient[ingKey];
      })
      .reduce((value, el) => {
        return value + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchased();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary;

  let burger = props.error ? "The ingredients can't able to" : <Spinner />;

  if (loading) {
    orderSummary = <Spinner />;
  }

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          addedIngredients={props.onIngredientsAdded}
          removeIngredients={props.onIngredientsRemoved}
          disabled={disabledInfo}
          purchase={updatePurchaseStatus(props.ings)}
          ordered={purchaseHandler}
          isAuthentication={props.isAuth}
          price={props.totalPrice}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
      />
    );
  }
  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClose={purchasing}
        clicked={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingName) =>
      dispatch(burgerBuilderActions.addedIngredients(ingName)),
    onIngredientsRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removedIngredients(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchased: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
