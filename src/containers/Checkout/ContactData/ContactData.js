import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    }

    orderHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                address: {
                    country: "Turkey",
                    street: "Istanbul",
                    zipCode: "34750",
                },
                deliveryMethod: "fastest",
            }
        }

        axios.post("/order.json", order).then(response => {

            this.props.history.push('/');
        }).catch(error => {

            this.setState({loading: false});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type={"text"} name={"name"} placeholder={"Your Name"}/>
            <input className={classes.Input} type={"email"} name={"email"} placeholder={"Your Mail"}/>
            <input className={classes.Input} type={"text"} name={"street"} placeholder={"Your Street"}/>
            <input className={classes.Input} type={"text"} name={"code"} placeholder={"Your Code"}/>
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