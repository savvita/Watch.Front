import './AccountMenu.css'

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Link } from 'react-router-dom';

const AccountMenu = ({ user, onSignIn, onSignUp, onLogOut }) => {

    return <UncontrolledDropdown inNavbar nav className="account-menu" style={{ marginRight: '20px' }}>
                <DropdownToggle caret nav>My account</DropdownToggle>
                <DropdownMenu end dark>
                    { user && user.username === '' ? 
                        <>
                            <Link onClick={ onSignIn }><DropdownItem>Log in</DropdownItem></Link>
                            <Link onClick={ onSignUp }><DropdownItem>Register</DropdownItem></Link>
                        </> : 
                        <>
                            { user && user.isUser && <Link to='/myorders'><DropdownItem>My orders</DropdownItem></Link> }
                            { user && user.isAdmin && <Link to='/admin'><DropdownItem>Admin mode</DropdownItem></Link> }
                            { user && user.isManager && <Link to='/manager'><DropdownItem>Manager mode</DropdownItem></Link> }
                            <DropdownItem divider />
                            <Link onClick={ onLogOut }><DropdownItem>Log out</DropdownItem></Link>
                        </>
                    }
                </DropdownMenu>
                
            </UncontrolledDropdown>
}

AccountMenu.defaultProps = {
    isLogged: false,
    isUser: false,
    isManager: false,
    isAdmin: false
};

export default AccountMenu;