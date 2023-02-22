import Header from '../../components/Header/Header';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar';
import Footer from '../../components/Footer/Footer';
import Error from '../../components/Error/Error';

import token from '../../token';

import { Row, Col } from 'reactstrap';
import { Outlet } from 'react-router-dom';

import { useEffect, useState } from 'react';

function Manager() {
    const [access, setAccess] = useState(false);

    useEffect(() => {
        setAccess(token.getUserInfo().isManager);
    }, []);

    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <div className="flex-grow-1">
                { access ? 
                <Row className="ps-4 flex-grow-1">
                    <ManagerSidebar />
                    <Outlet />
                </Row>
                     :
                <Error text="Access denied" className="m-4 fs-2 text-center" />
                }
            </div>
            <Footer />
        </div>
    );
}

export default Manager;