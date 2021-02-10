import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      value: "",
    },
  });

  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  const switchSignChangeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  let formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = (
    <form onSubmit={submitHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidation={formElement.config.validation}
          touched={formElement.config.touched}
          changedHandler={(event) => inputChangeHandler(event, formElement.id)}
        />
      ))}
      <Button btnType={"Success"}>SUBMIT</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let redirectAuth = null;
  if (props.isAuth) {
    redirectAuth = <Redirect to={props.authRedirectPath} />;
  }

  let errorMessageShow = null;
  if (props.error) {
    errorMessageShow = props.error;
  }

  return (
    <div className={classes.Auth}>
      {redirectAuth}
      {errorMessageShow}
      {form}
      <Button btnType={"Danger"} clicked={switchSignChangeHandler}>
        SWITCH TO {isSignUp ? "SIGN UP" : "SIGN IN"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
