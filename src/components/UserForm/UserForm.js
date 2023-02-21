import Button from '../Button/Button';
import Error from '../Error/Error';

import { useEffect, useState } from 'react';
import { Form, Row, Label, Col, Input, FormFeedback } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { updateAsync, getAsync } from '../../app/usersSlice';

import './UserForm.css';

const UserForm = ({ user, isVisible, onClose }) => {
    const dispatch = useDispatch();

    const [login, setLogin] = useState({ value: user.userName, isValid: true });
    const [email, setEmail] = useState({ value: user.email, isValid: true });

    const [errorTxt, setErrorTxt] = useState();

    useEffect(() => {
        if(!user) return;
        setLogin({ value: user.userName, isValid: user.userName.length > 0 });
        setEmail({ value: user.email, isValid: user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) });
    }, [user]);

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        switch (name) {
            case 'login':
                setLogin({ value: value, isValid: value.length > 0 });
                break;
            case 'email':
                setEmail({ value: value, isValid: value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) });
                break;
            default:
                break;
        }
    }

    const onCloseClick = (e) => {
        e.preventDefault();
        setErrorTxt("");
        onClose && onClose();
    }

    const onSaveClick = async (e) => {
        e.preventDefault();
        const res = await dispatch(updateAsync({ ...user, userName: login.value, email: email.value }));
        if(res.payload.code) {
            if(res.payload.code === "login-is-registered") {
                setErrorTxt("Login is already registered");
            }
            else {
                setErrorTxt("Something went wrong. Sorry :(");
            }
        }
        else {
            dispatch(getAsync());
            setErrorTxt("");
            onClose && onClose();
        }
    }
    
    if (!isVisible) return null;

    return (
        <div className="position-absolute top-50 start-50 translate-middle bg-dark border border-1 border-light rounded-1 w-50 text-white p-5" style={{ zIndex: 2000 }}>
            <Form>
                <Row>
                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='user_login'>Login</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="user_login" type="text" name="login" placeholder="Login" value={ login.value } onInput={ handleUserInput } invalid={ !login.isValid } />
                            <FormFeedback>Login is required</FormFeedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='user_email'>Email</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="user_email" type="email" name="email" placeholder="Email" value={ email.value } onInput={ handleUserInput } invalid={ !email.isValid } />
                            <FormFeedback>Email is required</FormFeedback>
                        </Col>
                    </Row>
                </Row>
                <Error text={ errorTxt } />
                <Row className="flex justify-content-center">
                    <Button value="Ok" className="user-button" onClick={ onSaveClick } />
                    <Button value="Cancel" className="user-button" onClick={ onCloseClick } />
                </Row>
            </Form>
        </div>
    );
}

export default UserForm;