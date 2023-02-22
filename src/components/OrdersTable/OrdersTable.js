import OrderDetailRow from '../OrderDetailRow/OrderDetailRow';

import { Table, Input, FormFeedback, FormGroup } from 'reactstrap';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues } from '../../app/ordersSlice';

const OrdersTable = ({ isManagerMode }) => {
    const values = useSelector(selectValues);
    const dispatch = useDispatch();

    const[orders, setOrders] = useState([]);
    const[errorTxt, setErrorTxt] = useState([]);

    useEffect(() => {
        dispatch(getAsync(isManagerMode));
        setOrders(values);
    }, []);

    useEffect(() => {
        setOrders(values);
    }, [values]);

    useEffect(() => {
        if(orders.length === 0) {
            setErrorTxt('Not found. Sorry :(');
        }
        else {
            setErrorTxt('');
        }
    }, [orders]);

    const filter = (e) => {
        const value = e.target.value.toLowerCase();
        setOrders(values.filter(x => x.userId.includes(value)));
    }

    return (
        <div>
            <h3 className="text-white text-center">Orders</h3>
             { isManagerMode && <FormGroup  className="position-relative">
                <Input name="search" placeholder="Search" type="search" onInput={ filter } invalid={ orders.length === 0 } />
                <FormFeedback tooltip className="text-white">{ errorTxt }</FormFeedback>
            </FormGroup> }
            <Table dark className="mt-5">
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