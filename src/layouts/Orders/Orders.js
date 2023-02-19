import Header from '../../components/Header/Header';
import OrdersTable from '../../components/OrdersTable/OrdersTable';
import { useLocation } from 'react-router-dom';

const Orders = ({ isManagerMode }) => {
    const location = useLocation();
    return (
        <div className="d-flex flex-column page-container">
            { location.pathname === '/myorders' && <Header /> }
            <div className="d-flex flex-wrap flex-row justify-content-center border-top border-light">
                <OrdersTable isManagerMode={ isManagerMode } />
            </div>
        </div>
    );
}

export default Orders;