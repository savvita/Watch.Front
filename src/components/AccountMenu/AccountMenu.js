import './AccountMenu.css'

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Link } from 'react-router-dom';


function AccountMenu({ isLogged, isUser, isManager, isAdmin }) {
    return <UncontrolledDropdown inNavbar nav className="account-menu" style={{ marginRight: '20px' }}>
                <DropdownToggle caret nav>
                    My account
                </DropdownToggle>
                <DropdownMenu end dark>
                    { isLogged ? 
                        <>
                            <Link to='/signin'><DropdownItem>Log in</DropdownItem></Link>
                            <Link to='/signup'><DropdownItem>Register</DropdownItem></Link>
                        </> : 
                        <>
                            { isUser && <Link to='/myorders'><DropdownItem>My orders</DropdownItem></Link> }
                            { isAdmin && <Link to='/admin'><DropdownItem>Admin mode</DropdownItem></Link> }
                            { isManager && <Link to='/manager'><DropdownItem>Manager mode</DropdownItem></Link> }
                            <DropdownItem divider />
                            <Link to='/signup'><DropdownItem>Log out</DropdownItem></Link>
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