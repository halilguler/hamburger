import React, {Component} from "react";
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from "../../axios-orders";
import * as actions from '../../store/actions/index';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render() {
        let order = this.props.orders.map(item => {
            return <Order key={item.id} ingredients={item.ingredients} price={item.price}/>
        })
        if (this.props.loading) {
            order = <Spinner/>
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrder(token,userId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));