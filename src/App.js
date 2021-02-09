import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner";

const burgerBuilder = React.lazy(() =>
  import("./containers/BurgerBuilder/BurgerBuilder")
);
const logout = React.lazy(() => import("./containers/Auth/Logout/Logout"));
const orders = React.lazy(() => import("./containers/Orders/Orders"));
const auth = React.lazy(() => import("./containers/Auth/Auth"));
const checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let router = (
    <Switch>
      <Route path={"/auth"} component={auth} />
      <Route path={"/"} exact component={burgerBuilder} />
      <Redirect to={"/"} />
    </Switch>
  );
  if (props.isAuthentication) {
    router = (
      <Switch>
        <Route path={"/checkout"} component={checkout} />
        <Route path={"/orders"} component={orders} />
        <Route path={"/auth"} component={auth} />
        <Route path={"/logout"} component={logout} />
        <Route path={"/"} exact component={burgerBuilder} />
        <Redirect to={"/"} />
        {/*<Route render={() => (<h2>404 not found!</h2>)}/>*/}
        {/*<Redirect from={'/checkout'} to={'/'}/>*/}
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner />}>{router} </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthentication: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
