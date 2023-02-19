

import { Nav, NavLink } from 'reactstrap';
  
import { NavLink as RRNavLink } from 'react-router-dom';

import './ManagerSidebar.css';

const ManagerSidebar = () => {
    return (
        <div className="border-1 border-end border-light mt-3 p-0 text-white">
            <Nav className="me-auto" navbar>
                <NavLink tag={RRNavLink} to="watches" className="btn btn-outline-light rounded-0">Watches</NavLink>
                <NavLink tag={RRNavLink} to="categories" className="btn btn-outline-light rounded-0">Categories</NavLink>
                <NavLink tag={RRNavLink} to="producers" className="btn btn-outline-light rounded-0">Producers</NavLink>
                <NavLink tag={RRNavLink} to="orders" className="btn btn-outline-light rounded-0">Orders</NavLink>
            </Nav>
        </div>
    );
}

export default ManagerSidebar;
