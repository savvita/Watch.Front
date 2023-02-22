import UserDetailRow from '../UserDetailRow/UserDetailRow';
import UserForm from '../UserForm/UserForm';

import { Table, Input, FormFeedback, FormGroup } from 'reactstrap';
import { useEffect, useState } from 'react'; 

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues } from '../../app/usersSlice';

const UsersTable = () => {
    const values = useSelector(selectValues);
    const dispatch = useDispatch();

    const[users, setUsers] = useState([]);
    const[errorTxt, setErrorTxt] = useState([]);

    useEffect(() => {
        dispatch(getAsync());
        setUsers(values);
    }, []);

    useEffect(() => {
        setUsers(values);
    }, [values]);

    useEffect(() => {
        if(users.length === 0) {
            setErrorTxt('Not found. Sorry :(');
        }
        else {
            setErrorTxt('');
        }
    }, [users]);

    const [user, setUser] = useState({ userName: '', email: '', isManager: false, isAdmin: false });
    
    const [modal, setModal] = useState(false); 

    const showForm = (user) => {
        setUser(user);
        setModal(true);
    }

    const filter = (e) => {
        const value = e.target.value.toLowerCase();
        setUsers(values.filter(x => x.id.includes(value) || x.userName.toLowerCase().includes(value) || x.email.toLowerCase().includes(value)));
    }

    return (
    <div className="mt-3">
        <h3 className="text-white text-center">Users</h3>
        <FormGroup  className="position-relative">
            <Input name="search" placeholder="Search" type="search" onInput={ filter } invalid={ users.length === 0 } />
            <FormFeedback tooltip className="text-white">{ errorTxt }</FormFeedback>
        </FormGroup>
        <Table dark className="mt-5">
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