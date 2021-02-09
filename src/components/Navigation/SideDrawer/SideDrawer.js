import React from "react";
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    let attachedClass = [classes.SideDrawer,classes.Close];

    if(props.open){
        attachedClass =[classes.SideDrawer,classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthentication={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;