import OrderDetailsTable from '../../components/OrderDetailsTable/OrderDetailsTable';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getByIdAsync as getOrder, selectValues, closeAsync, cancelAsync } from '../../app/ordersSlice';

const OrderView = () => {
    const value = useSelector(selectValues);
    const dispatch = useDispatch();

    const params = useParams();

    const [order, setOrder] = useState({});

    
    useEffect(() => {
        dispatch(getOrder(params.id));
        setOrder(value[0]);
    }, []);

    useEffect(() => {
        setOrder(value[0]);
    }, [value]);

    const closeOrder = async () => {
        await dispatch(closeAsync(order.id));
        dispatch(getOrder(params.id));
    }

    const cancelOrder = async () => {
        await dispatch(cancelAsync(order.id));
        dispatch(getOrder(params.id));
    }

    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <div className="flex-grow-1 border-top border-light pt-5">
                <OrderDetailsTable order={ order } onClose={ closeOrder } onCancel={ cancelOrder } />
            </div>
            <Footer />
        </div>
    );
}

export default OrderView;