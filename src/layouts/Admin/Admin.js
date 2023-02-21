import Header from '../../components/Header/Header';
import UsersTable from '../../components/UsersTable/UsersTable';

const Admin = () => {
    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <div className="d-flex flex-wrap flex-row justify-content-center border-top border-light">
                <UsersTable />
            </div>
        </div>
    );
}

export default Admin;