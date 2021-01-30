import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import {connect} from 'react-redux';

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
                <Toolbar isAuth={this.props.isAuthentication} clicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthentication} open={this.state.showSideDrawer} clicked={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>);
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthentication: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);