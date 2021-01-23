import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "your name"
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "your email",
                },
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street"
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: ""
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [{value: "fastest", displayValue: "Fastest"}, {
                        value: "cheapest",
                        displayValue: "Cheapest"
                    }],
                }
            }
        },

        loading: false
    }

    orderHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,

        }

        axios.post("/order.json", order).then(response => {

            this.props.history.push('/');
        }).catch(error => {

            this.setState({loading: false});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    inputChangeHandler = (event, inputIdentity) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateOrderForm[inputIdentity]
        }
        updateFormElement.value = event.target.value;
        updateOrderForm[inputIdentity] = updateFormElement;
        this.setState({orderForm: updateOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }
        let form = (<form>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       changedHandler={(event) => (this.inputChangeHandler(event, formElement.id))}/>
            ))}
            <Button btnType={"Success"} clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;