import Header from '../../components/Header/Header';
import OrdersTable from '../../components/OrdersTable/OrdersTable';

const Orders = ({ isManagerMode }) => {
    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <div className="d-flex flex-wrap flex-row justify-content-center border-top border-light">
                <OrdersTable isManagerMode={ isManagerMode } />
            </div>
        </div>
    );
}

export default Orders;