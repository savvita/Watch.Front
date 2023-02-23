import Header from '../../components/Header/Header';
import OrdersTable from '../../components/OrdersTable/OrdersTable';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Orders = ({ isManagerMode }) => {
    const location = useLocation();
    return (
        <>
            <div className="d-flex flex-column page-container">
                { location.pathname === '/myorders' && <Header /> }
                <Breadcrumb className='bread'>
                    <BreadcrumbItem>
                        <Link to="/">Home</Link>
                    </BreadcrumbItem>
                    { isManagerMode &&
                        <BreadcrumbItem>
                            <Link to="/manager">Manager</Link>
                        </BreadcrumbItem>
                    }
                    <BreadcrumbItem active>
                        Orders
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="d-flex flex-wrap flex-row justify-content-center border-top border-light">
                    <OrdersTable isManagerMode={ isManagerMode } />
                </div>
            </div>
        </>
    );
}

export default Orders;