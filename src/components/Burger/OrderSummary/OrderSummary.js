import React from 'react'
import Aux from "../../../hoc/Aux";

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
        </Aux>
    );
}

export default orderSummary;