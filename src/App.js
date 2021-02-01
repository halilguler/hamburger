import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import * as actions from './store/actions/index';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let router = (
            <Switch>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={'/'}/>
            </Switch>
        )
        if (this.props.isAuthentication) {
            router = (<Switch>
                <Route path={"/checkout"} component={Checkout}/>
                <Route path={"/orders"} component={Orders}/>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={'/'}/>
                {/*<Route render={() => (<h2>404 not found!</h2>)}/>*/}
                {/*<Redirect from={'/checkout'} to={'/'}/>*/}
            </Switch>)
        }

        return (
            <div className="App">
                <Layout>
                    {router}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthentication: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
