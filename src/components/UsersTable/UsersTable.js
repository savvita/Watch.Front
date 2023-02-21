import UserDetailRow from '../UserDetailRow/UserDetailRow';
import UserForm from '../UserForm/UserForm';

import { Table } from 'reactstrap';
import { useEffect, useState } from 'react'; 

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues } from '../../app/usersSlice';

const UsersTable = () => {
    const users = useSelector(selectValues);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsync());
    }, []);

    const [user, setUser] = useState({ userName: '', email: '', isManager: false, isAdmin: false });
    
    const [modal, setModal] = useState(false); 

    const showForm = (user) => {
        setUser(user);
        setModal(true);
    }

    return (
    <div className="mt-3">
        <h3 className="text-white">Users</h3>
        <Table dark>
            <thead>
                <tr className="text-center">
                    <th scope="col">Id</th>
                    <th scope="col">Login</th>
                    <th scope="col">Email</th>
                    <th scope="col">Manager</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { users.map(x => <UserDetailRow key={ x.id } user={ x } onEditClick={ showForm } />) }
            </tbody>
        </Table>
        <UserForm isVisible={ modal } user={ user } onClose={ () => setModal(false) } />
    </div>
    );
}

export default UsersTable;