import React from 'react'
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey,index)=>{
        return <li style={{textTransform:'capitalize'}} key={index}> <span>{igKey}</span> : {props.ingredients[igKey]}</li>
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients..</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:</strong>{props.price.toFixed(2)}</p>
            <p>Continue or Checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    );
}

export default orderSummary;