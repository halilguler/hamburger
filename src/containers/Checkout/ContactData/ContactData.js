import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";
import order from "../../../components/Order/Order";
import { updateObject,checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postalCode",
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        valid: true,
        validation: {},
        value: "fastest",
      },
    },
    formIsValid: false,
  };

  orderHandler = () => {
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onPurchaseBurger(order, this.props.token);
  };

  inputChangeHandler = (event, inputIdentity) => {
    const updateFormElement = updateObject(
      this.state.orderForm[inputIdentity],
      {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.validation),
        touched: true,
      }
    );
    const updateOrderForm = updateObject(this.state.orderForm, {
      [inputIdentity]: updateFormElement,
    });
    let formIsValid = true;
    for (let formElementIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[formElementIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidation={formElement.config.validation}
            touched={formElement.config.touched}
            changedHandler={(event) =>
              this.inputChangeHandler(event, formElement.id)
            }
          />
        ))}
        <Button btnType={"Success"} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
