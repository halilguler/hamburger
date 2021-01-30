import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path={"/checkout"} component={Checkout}/>
                        <Route path={"/orders"} component={Orders}/>
                        <Route path={"/auth"} component={Auth}/>
                        <Route path={"/logout"} component={Logout}/>
                        <Route path={"/"} exact component={BurgerBuilder}/>

                        {/*<Route render={() => (<h2>404 not found!</h2>)}/>*/}
                        {/*<Redirect from={'/checkout'} to={'/'}/>*/}
                    </Switch>
                </Layout>
                <h1>Hamburger</h1>
            </div>
        );
    }

}

export default App;
