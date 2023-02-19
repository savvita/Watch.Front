import { Input, FormGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';


const UserDetailRow = ({ user, onUpdate, onEdit, onDelete }) => {
    const [isManager, setIsManager] = useState(user.isManager);
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);

    if(!user || user.userName === '') {
        return null;
    }

    const switchManagerRole = () => {
        user.isManager = !user.isManager;
        setIsManager(!isManager);
        onUpdate && onUpdate(user);
    }

    const switchAdminRole = () => {
        user.isAdmin = !user.isAdmin;
        setIsAdmin(!isAdmin);
        onUpdate && onUpdate(user);
    }

    return (
        <tr>
            <th scope="row">${user.id}</th>
            <td>{ user.userName }</td>
            <td>{ user.email }</td>
            <td><FormGroup switch><Input type="switch" checked={ isManager } onChange={ switchManagerRole } /></FormGroup></td>
            <td><FormGroup switch><Input type="switch" checked={ isAdmin } onChange={ switchAdminRole } /></FormGroup></td>
            <td><FaEdit onClick={ () => onEdit && onEdit(user) } /></td>
            <td><FaTrashAlt onClick={ () => onDelete && onDelete(user) } /></td>
        </tr>
    );
}

export default UserDetailRow;