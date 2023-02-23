import Header from '../../components/Header/Header';
import UsersTable from '../../components/UsersTable/UsersTable';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';

import token from '../../token';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [access, setAccess] = useState(false);

    useEffect(() => {
        setAccess(token.getUserInfo().isAdmin);
    }, []);

    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <Breadcrumb className='bread'>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    Admin
                </BreadcrumbItem>
            </Breadcrumb>
            <div className="d-flex flex-wrap flex-row justify-content-center border-top border-light flex-grow-1">
                <div className="flex-grow-1">
                    { access ? <UsersTable /> : <Error text="Access denied" className="m-4 fs-2" /> }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;