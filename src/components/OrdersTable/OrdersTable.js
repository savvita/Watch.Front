import OrderDetailRow from '../OrderDetailRow/OrderDetailRow';

import { Table } from 'reactstrap';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues } from '../../app/ordersSlice';

const OrdersTable = ({ isManagerMode }) => {
    const orders = useSelector(selectValues);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsync());
    }, []);

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
                    { orders.map(x => <OrderDetailRow key={ x.id } order={ x } isManagerMode={ isManagerMode } />) }
                </tbody>
            </Table>
        </div>
    );
}

export default OrdersTable;