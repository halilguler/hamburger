import React from "react";

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: "salad"},
    {label: 'Bacon', type: "bacon"},
    {label: 'Cheese', type: "cheese"},
    {label: 'Meat', type: "meat"},
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} remove={() => props.removeIngredients(ctrl.type)}
                              added={() => props.addedIngredients(ctrl.type)} disabled={props.disabled[ctrl.type]}/>
            ))}
        </div>
    );
}

export default buildControls;