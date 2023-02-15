import React, { useState } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Input,
} from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';

import { FaShoppingBasket } from 'react-icons/fa';

import './Header.css';


function Header ({ username, isUser, isManager, isAdmin, onSearch, onBasketClick }) {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);


    return <header>
                <Navbar dark expand={"md"} className="p-3">
                    <NavbarBrand tag={RRNavLink} to="/" className="fs-1 fw-weight-bold">Watch Market</NavbarBrand>
                    <NavbarToggler onClick={ toggleNavbar } />
                    <Collapse navbar isOpen={ !collapsed }>
                        <Nav className="me-auto" navbar>
                            <NavLink tag={RRNavLink} to="/">Home</NavLink>
                            <NavLink tag={RRNavLink} to="/about">About</NavLink>

                            <AccountMenu isLogged={ username !== "" } isUser={ isUser } isManager={isManager } isAdmin={ isAdmin } />
                        </Nav>
                    </Collapse>
                    <Input
                        name="search"
                        placeholder="Search"
                        type="search"
                        onChange={ (e) => onSearch(e.target.value) } />
                </Navbar>
                <div className="d-flex justify-content-end pe-6">
                    <p className="text-white pe-4">{ username && `Hello, ${ username }` }</p>
                    <FaShoppingBasket style={{ marginRight: '20px' }} onClick={ onBasketClick } />
                </div>

        </header>
}

Header.defaultProps = {
    username: "",
    isUser: false,
    isManager: false,
    isAdmin: false
};

export default Header;