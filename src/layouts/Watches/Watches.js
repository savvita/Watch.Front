import WatchesTable from "../../components/WatchesTable/WatchesTable"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Watches = () => {
    return (
        <>
            <Breadcrumb className='bread'>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to="/manager">Manager</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    Watches
                </BreadcrumbItem>
            </Breadcrumb>
        <WatchesTable />
        </>
    );
}

export default Watches;