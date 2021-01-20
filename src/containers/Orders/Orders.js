import React, {Component} from "react";
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get("/order.json").then(res => {
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key});
            }
            this.setState({orders: fetchedOrders});
        }).catch(err => {
            console.log(err);
            this.setState({loading: false});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    render() {
        let order = this.state.orders.map(item => {
            return <Order key={item.id} ingredients={item.ingredients} price={item.price}/>
        })
        if (this.state.loading) {
            order = <Spinner/>
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);