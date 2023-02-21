import Error from '../Error/Error';

import { Input, FormGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { getAsync, updateAsync, deleteAsync } from '../../app/usersSlice';


const UserDetailRow = ({ user, onEditClick }) => {
    const dispatch = useDispatch();

    const [isManager, setIsManager] = useState(user.isManager);
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);

    const [errorTxt, setErrorTxt] = useState();

    if(!user || user.userName === '') {
        return null;
    }

    const switchManagerRole = () => {
        setIsManager(!isManager);
        updateUser({ ...user, isManager: !user.isManager });
    }

    const switchAdminRole = () => {
        setIsAdmin(!isAdmin);
        updateUser({ ...user, isAdmin: !user.isAdmin });
    }

    const updateUser = async(user) => {
        const res = await dispatch(updateAsync(user));
        if(res.payload.code) {
            if(res.payload.code === "user-not-found") {
                setErrorTxt("User not found");
            }
            else if(res.payload.code === "login-is-registered") {
                setErrorTxt("Login is already registered");
            }
            else {
                setErrorTxt("Something wwent wrong. Sorry :(");
            }
        }
        else {
            dispatch(getAsync());
            setErrorTxt("");
        }
    }

    const deleteUser = async () => {
        const res = await dispatch(deleteAsync(user.id));
        if(res.payload.code) {
            if(res.payload.code === "user-not-found") {
                setErrorTxt("User not found");
            }
            else {
                setErrorTxt("Something wwent wrong. Sorry :(");
            }
        }
        else {
            dispatch(getAsync());
            setErrorTxt("");
        }
    }

    return (
        <>
            <tr>
                <th scope="row">{ user.id }</th>
                <td>{ user.userName }</td>
                <td>{ user.email }</td>
                <td><FormGroup switch><Input type="switch" checked={ isManager } onChange={ switchManagerRole } /></FormGroup></td>
                <td><FormGroup switch><Input type="switch" checked={ isAdmin } onChange={ switchAdminRole } /></FormGroup></td>
                <td><FaEdit onClick={ () => onEditClick && onEditClick(user) } /></td>
                <td><FaTrashAlt onClick={ deleteUser } /></td>
                <td><Error text={ errorTxt } /></td>
            </tr>
        </>
    );
}

export default UserDetailRow;