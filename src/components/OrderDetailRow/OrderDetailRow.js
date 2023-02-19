import Button from '../Button/Button';


const OrderDetailRow = ({ order, isManagerMode, onClose, onCancel }) => {
    if(!order) {
        return null;
    }

    let total = 0;
    order.details.forEach(x => total += x.count * x.unitPrice);

    return (
        <tr>
            <th className="align-middle" scope="row">{ order.id }</th>
            <td className="align-middle">{ order.date }</td>
            { isManagerMode ? <td className="align-middle">{ order.userId }</td> : <td></td> }
            <td className="align-middle">{ order.status.statusName }</td>
            <td className="align-middle">{ order.details.map(x => <p key={ x.id } className="p-0 m-0">Watch: { x.watchId } ({ x.count })</p>) }</td>
            <td className="align-middle">{ total } &#8372;</td>
            { isManagerMode && (order.status.id === 1 || order.status.id === 2) ? <td><Button value="Close" onClick={ () => onClose && onClose(order.id) } /></td> : <td></td> }
            { order.status.id === 1 || order.status.id === 2 ? <td><Button value="Cancel" onClick={ () => onCancel && onCancel(order.id) } /></td> : <td></td> }
        </tr>

    );
}

export default OrderDetailRow;