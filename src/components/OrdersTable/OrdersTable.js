import OrderDetailRow from '../OrderDetailRow/OrderDetailRow';
import OrderFilter from '../OrderFilter/OrderFilter';

import { Table, Input, FormFeedback, FormGroup, NavbarToggler, Navbar, Collapse } from 'reactstrap';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues } from '../../app/ordersSlice';
import { selectValues as selectStatusses } from '../../app/statussesSlice';

const OrdersTable = ({ isManagerMode }) => {
    const values = useSelector(selectValues);
    const statusses = useSelector(selectStatusses);
    const dispatch = useDispatch();

    const[orders, setOrders] = useState([]);
    const[errorTxt, setErrorTxt] = useState([]);

    const [filters, setFilters] = useState({ user: '', statusses: [], startDate: '', endDate: '' });

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

    useEffect(() => {
        let w = values;
        
        if(filters.user) {
            w = values.filter( x => 
                x.userId.includes(filters.user));
        }

        if(filters.startDate) {
            w = w.filter( x => x.date >= filters.startDate);
        }


        if(filters.endDate) {
            w = w.filter( x => x.date <= filters.endDate);
        }

        if(filters.statusses.length > 0) {
            w = w.filter(x => filters.statusses.includes(x.status.id));
        }

        setOrders(w);
    }, [filters]);

    const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <h3 className="text-white text-center">Orders</h3>
            <Navbar color="faded" light>
                <NavbarToggler onClick={toggleNavbar} className="me-2" style={{ backgroundColor: '#fff', padding: '5px 20px' }}>Filters</NavbarToggler>
                <Collapse isOpen={!collapsed} navbar>
                    <OrderFilter statusses={ statusses } onChange={ (items) => setFilters({...items, user: filters.user }) } />
                </Collapse>
            </Navbar>
             { isManagerMode && <FormGroup  className="position-relative">
                <Input name="search" placeholder="Search" type="search" onInput={ (e) => setFilters({ ...filters, user: e.target.value.toLowerCase() }) } invalid={ orders.length === 0 } />
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