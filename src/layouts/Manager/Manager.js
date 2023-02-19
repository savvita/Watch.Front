import Header from '../../components/Header/Header';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar';
import Footer from '../../components/Footer/Footer';

import { Row, Col } from 'reactstrap';
import { Outlet } from 'react-router-dom';

function Manager() {
    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <Row className="ps-4 flex-grow-1">
                <Col md="3" sm="12">
                    <ManagerSidebar />
                </Col>
                <Col md="9" sm="12">
                    <Outlet />
                </Col>
            </Row>
            <Footer />
        </div>
    );
}

export default Manager;