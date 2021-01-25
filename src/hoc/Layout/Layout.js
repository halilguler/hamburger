import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

// State management kullandığımız ve fonksiyon göndereceğimiz için class component kullandık.

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }


    render() {
        return (
            <Aux>
                <SideDrawer open={this.state.showSideDrawer} clicked={this.sideDrawerCloseHandler}/>
                <Toolbar clicked={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>);
    }
}

export default Layout;