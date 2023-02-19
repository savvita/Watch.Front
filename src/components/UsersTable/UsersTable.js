import UserDetailRow from '../UserDetailRow/UserDetailRow';
import UserForm from '../UserForm/UserForm';
import Error from '../Error/Error';
import db from '../../database';

import { Table } from 'reactstrap';
import { useEffect, useState } from 'react'; 

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ userName: '', email: '', isManager: false, isAdmin: false });
    const [errorTxt, setErrorTxt] = useState();
    
    const [modal, setModal] = useState(false); 

    const loadUsers = async () => {
        const res = await db.getUsers();

        if(res) {
            if(res.value) {
                setUsers(res.value);
            }
        }
        else {
            setErrorTxt("Something went wrong. Try again later");
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const updateUser = async (user) => {
        await db.updateUser(user);
        await loadUsers();
    }

    const saveUser = async (user) => {
        await updateUser(user);
        setModal(false);
    }

    const editUser = (user) => {
        setUser(user);
        setModal(true);
    }

    const deleteUser = async (user) => {
        if(!user) return;
        await db.deleteUser(user.id);
        await loadUsers();
    }

    return (
        <div>
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
                </tr>
            </thead>
            <tbody>
                { users.map(x => <UserDetailRow key={ x.id } user={ x } onUpdate={ updateUser } onEdit={ editUser } onDelete={ deleteUser } />) }
            </tbody>
        </Table>
        <Error text={ errorTxt } />
        <UserForm isVisible={ modal } user={ user } onCancel={ () => setModal(false) } onUpdate={ saveUser } />
    </div>
    );
}

export default UsersTable;