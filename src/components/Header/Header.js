import Authorization from '../Authorization/Authorization';
import token from '../../token';

import React, { useState } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Input,
  NavLink
} from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';

import { FaShoppingBasket } from 'react-icons/fa';

import './Header.css';


const Header = ({ onSearch, onBasketClick }) => {
    const [user, setUser] = useState(token.getUserInfo());
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [modal, setModal] = useState(false);
    const [isSignIn, setMode] = useState(true);

    const onCancel = () => {
        setModal(false);
    }

    const onLogOut = () => {
        setUser(token.logOut());
    }

    const onSignIn = () => {
        setMode(true);
        setModal(true);
    }

    const onSignUp = () => {
        setMode(false);
        setModal(true);
    }

    const onAuthorize = () => {
        setModal(false);
        setUser(token.getUserInfo());
    }


    return <header>
                <Navbar dark expand={"md"} className="p-3">
                    <NavbarBrand tag={RRNavLink} to="/" className="fs-1 fw-weight-bold">Watch Market</NavbarBrand>
                    <NavbarToggler onClick={ toggleNavbar } />
                    <Collapse navbar isOpen={ !collapsed }>
                        <Nav className="me-auto" navbar>
                            <NavLink tag={RRNavLink} to="/">Home</NavLink>
                            <NavLink tag={RRNavLink} to="/about">About</NavLink>

                            <AccountMenu user={ user } onSignIn={ onSignIn } onSignUp={ onSignUp } onLogOut={ onLogOut } />
                        </Nav>
                    </Collapse>
                    <Input name="search" placeholder="Search" type="search" onInput={ (e) => onSearch && onSearch(e.target.value) } />
                </Navbar>
                <div className="d-flex justify-content-end pe-6">
                    <p className="text-white pe-4">{ user.username !== '' && `Hello, ${ user.username }` }</p>
                    <FaShoppingBasket style={{ marginRight: '20px' }} onClick={ onBasketClick } />
                </div>

                <Authorization isVisible={ modal } onCancel = { onCancel } signIn={ isSignIn } signUp={ !isSignIn } onOk={ onAuthorize } />

        </header>
}

export default Header;