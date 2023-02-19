import OrderDetailRow from '../OrderDetailRow/OrderDetailRow';
import Error from '../Error/Error';
import db from '../../database';

import { Table } from 'reactstrap';
import { useEffect, useState } from 'react';

const OrdersTable = ({ isManagerMode }) => {
    const [orders, setOrders] = useState([]);
    const [errorTxt, setErrorTxt] = useState();

    const loadOrders = async () => {
        const res = await db.getOrders(isManagerMode);

        if(res) {
            if(res.value) {
                setOrders(res.value);
            }
        }
        else {
            setErrorTxt("Something went wrong. Try again later");
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const closeOrder = async (id) => {
        await db.closeOrder(id);
        await loadOrders();
    }

    const cancelOrder = async (id) => {
        await db.cancelOrder(id);
        await loadOrders();
    }

    return (
        <div>
            <h3 className="text-white">Orders</h3>
            <Table dark>
                <thead>
                    <tr className="text-center">
                        <th scope="col">Id</th>
                        <th scope="col">Date</th>
                        { isManagerMode ? <th scope="col">UserId</th> : <th></th> }
                        <th scope="col">Status</th>
                        <th scope="col">Details</th>
                        <th scope="col">Total</th>
                        { isManagerMode ? <th scope="col">Close</th> : <th></th> }
                        <th scope="col">Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    { orders.map(x => <OrderDetailRow key={ x.id } order={ x } isManagerMode={ isManagerMode } onClose={ closeOrder } onCancel={ cancelOrder } />) }
                </tbody>
            </Table>

            <Error text={ errorTxt } />
        </div>
    );
}

export default OrdersTable;