import React from 'react';
import Aux from '../../hoc/Aux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <SideDrawer />
        <Toolbar/>
        <main className={classes.Content}>{props.children}</main>
    </Aux>);

export default layout;