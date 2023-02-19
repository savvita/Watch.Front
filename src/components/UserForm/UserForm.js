import Button from '../Button/Button';

import { useEffect, useState } from 'react';
import { Form, Row, Label, Col, Input, FormFeedback } from 'reactstrap';

import './UserForm.css';

const UserForm = ({ user, isVisible, onUpdate, onCancel }) => {
    const [login, setLogin] = useState({ value: user.userName, isValid: true });
    const [email, setEmail] = useState({ value: user.email, isValid: true });

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

    const onClose = (e) => {
        e.preventDefault();
        onCancel && onCancel();
    }

    const onEdit = (e) => {
        e.preventDefault();
        user.userName = login.value;
        user.email = email.value;
        onUpdate && onUpdate(user);
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
                <Row className="flex justify-content-center">
                    <Button value="Ok" className="user-button" onClick={ onEdit } />
                    <Button value="Cancel" className="user-button" onClick={ onClose } />
                </Row>
            </Form>
        </div>
    );
}

export default UserForm;