import no_image from './No_image_available.png';
import token from '../../token';

import { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';

import { getByIdAsync, selectValues } from '../../app/watchesSlice';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

const OrderDetailsTable = ({ order, onClose, onCancel  }) => {
    let navigate = useNavigate();
    const value = useSelector(selectValues);
    const [watches, setWatches] = useState([]);
    const [total, setTotal] = useState([]);
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

    useEffect(() => {
        if(!order || !order.details) return;

        setUser(token.getUserInfo());

        const loadWatches = async () => {
            const w = [];
            let sum = 0;

            for(let detail of order.details) {
                const res = await dispatch(getByIdAsync(detail.watchId));
                w.push({ id: detail.id, watch: res.payload.value, count: detail.count, price: detail.unitPrice });
                sum += detail.count * detail.unitPrice;
            }

            setWatches(w);
            setTotal(sum);
        }
        loadWatches();
    }, [order]);


    if(!order) return null;

    return (
        <div>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <div className="d-flex justify-content-between">
                <div>
                    <h3 className="text-white">Order #{ order.id }</h3>
                    <h5 className="text-white">Date: { (new Date(order.date)).toLocaleString() }</h5>
                    <h5 className="text-white">User: { order.userId }</h5>
                    <h5 className="text-white">Status: { order.status && order.status.statusName }</h5>
                </div>
                <div className="d-flex flex-column">
                    { user && user.isManager && order.status && (order.status.id === 1 || order.status.id === 2) && <Button color="danger" className="m-1" onClick={ onClose }>Close</Button> }
                    { order.status && (order.status.id === 1 || order.status.id === 2) && <Button color="danger" className="m-1" onClick={ onCancel }>Cancel</Button> }
                </div>
            </div>


            <Table dark style={{ minWidth: '300px' }} className="mt-5">
                <thead>
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Watch</th>
                        <th scope="col">Code</th>
                        <th scope="col">Producer</th>
                        <th scope="col">Model</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                { watches && watches.map((x, i) => 
                    <tr key={ x.id } className="text-center">
                        <th scope="row">{ i + 1 }</th>
                        <td><Link to={ `/watches/${ x.watch.id }` } style={{ textDecoration: 'none' }}><img alt={ x.watch.model} src={x.watch.imageUrl ?? { no_image }} className="card-img-top small" /></Link></td>
                        <td>{ x.watch.id }</td>
                        <td>{ x.watch.producer && x.watch.producer.producerName }</td>
                        <td>{ x.watch.model }</td>
                        <td>{ x.watch.category && x.watch.category.categoryName }</td>
                        <td>{ x.price } &#8372;</td>
                        <td>{ x.count }</td>
                        <td>{ x.price * x.count } &#8372;</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <h3 className='text-white text-end'>Total: { total } &#8372;</h3>
        </div>
    );
}

export default OrderDetailsTable;