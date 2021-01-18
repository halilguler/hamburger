import React from 'react';
import {withRouter} from 'react-router-dom'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './ChekoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h3>We Hope it tastes well!</h3>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button
                btnType={"Danger"}
                clicked={props.clickedCanceled}>
                CANCEL
            </Button>
            <Button
                btnType={"Success"}
                clicked={props.clickedContinued}
            >
                CONTINUE
            </Button>
        </div>
    )
}

export default withRouter(checkoutSummary);