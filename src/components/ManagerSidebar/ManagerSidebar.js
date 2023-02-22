

import { Nav, NavLink, Navbar, NavbarToggler, ButtonGroup, Collapse, Button } from 'reactstrap';
  
import { NavLink as RRNavLink } from 'react-router-dom';

import './ManagerSidebar.css';


import { useState } from 'react';

const ManagerSidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <Navbar dark expand={"md"} className="p-3">
            <NavbarToggler onClick={ toggleNavbar } />
            <Collapse navbar isOpen={ !collapsed } style={{ width: '100%'}}>
                <ButtonGroup className="p-3 mb-2 d-flex justify-content-center w-100 manager_nav">
                    <Button color="light" outline className="btn btn-outline-light rounded-0"><NavLink tag={RRNavLink} to="watches">Watches</NavLink></Button>
                    <Button color="light" outline className="btn btn-outline-light rounded-0"><NavLink tag={RRNavLink} to="categories">Categories</NavLink></Button>
                    <Button color="light" outline className="btn btn-outline-light rounded-0"><NavLink tag={RRNavLink} to="producers">Producers</NavLink></Button>
                    <Button color="light" outline className="btn btn-outline-light rounded-0"><NavLink tag={RRNavLink} to="orders">Orders</NavLink></Button>
                </ButtonGroup>
            </Collapse>
        </Navbar>
    );
}

export default ManagerSidebar;
