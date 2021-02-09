import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthentication}
        clicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthentication}
        open={showSideDrawer}
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthentication: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
