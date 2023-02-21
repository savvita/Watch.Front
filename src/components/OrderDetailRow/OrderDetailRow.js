import Button from '../Button/Button';

import { useDispatch } from 'react-redux';
import { getAsync, closeAsync, cancelAsync } from '../../app/ordersSlice';

import './OrderDetailRow.css';

const OrderDetailRow = ({ order, isManagerMode }) => {
    const dispatch = useDispatch();

    if(!order) {
        return null;
    }

    let total = 0;
    order.details.forEach(x => total += x.count * x.unitPrice);

    const closeOrder = async () => {
        await dispatch(closeAsync(order.id));
        await dispatch(getAsync());
    }

    const cancelOrder = async () => {
        await dispatch(cancelAsync(order.id));
        await dispatch(getAsync());
    }

    return (
        <tr>
            <th className="align-middle" scope="row">{ order.id }</th>
            <td className="align-middle">{ order.date }</td>
            { isManagerMode ? <td className="align-middle">{ order.userId }</td> : <td></td> }
            <td className="align-middle">{ order.status.statusName }</td>
            <td className="align-middle">{ order.details.map(x => <p key={ x.id } className="p-0 m-0">Watch: { x.watchId } ({ x.count })</p>) }</td>
            <td className="align-middle">{ total } &#8372;</td>
            { isManagerMode && (order.status.id === 1 || order.status.id === 2) ? <td><Button value="Close" onClick={ closeOrder } className="btn-small" /></td> : <td></td> }
            { order.status.id === 1 || order.status.id === 2 ? <td><Button value="Cancel" onClick={ cancelOrder } className="btn-small" /></td> : <td></td> }
        </tr>

    );
}

export default OrderDetailRow;