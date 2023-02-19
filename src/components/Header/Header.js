import Authorization from '../Authorization/Authorization';
import Basket from '../Basket/Basket';
import token from '../../token';

import React, { useEffect, useState } from 'react';
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


const Header = ({ onSearch, buyAdded, onBasketClosed }) => {
    const [user, setUser] = useState(token.getUserInfo());
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [auth, setAuth] = useState(false);
    const [isSignIn, setMode] = useState(true);

    const [basket, setBasket] = useState(false || buyAdded);

    useEffect(() => {
        setBasket(false || buyAdded);
    }, [buyAdded]);

    const onAuthCancel = () => {
        setAuth(false);
    }

    const onLogOut = () => {
        setUser(token.logOut());
    }

    const onSignIn = () => {
        setMode(true);
        setAuth(true);
    }

    const onSignUp = () => {
        setMode(false);
        setAuth(true);
    }

    const onAuthorize = () => {
        setAuth(false);
        setUser(token.getUserInfo());
    }
    
    const onBasketClose = () => {
        setBasket(false);
        onBasketClosed && onBasketClosed();
    }

    const onOrder = () => {
        setBasket(false);
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
                    <FaShoppingBasket style={{ marginRight: '20px', visibility: user.isUser ? 'visible' : 'hidden' }} onClick={ () => setBasket(true) } />
                </div>

                <Authorization isVisible={ auth } onCancel = { onAuthCancel } signIn={ isSignIn } signUp={ !isSignIn } onOk={ onAuthorize } />

                <Basket isVisible={ basket } onClose={ onBasketClose } onBuy={ onOrder } />

        </header>
}

export default Header;