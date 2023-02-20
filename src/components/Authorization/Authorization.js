import Error from '../Error/Error';
import Button from '../Button/Button';
import db from '../../database';

import { Form, FormGroup, Label, Col, Input, FormFeedback } from 'reactstrap';
import { useEffect, useState } from 'react';

import './Authorization.css';

const Authorization = ({ signIn, signUp, isVisible, onOk, onCancel }) => {
    
    const [errorTxt, setErrorTxt] = useState("\u00A0")
    
    const [login, setLogin] = useState({ value: '', isValid: false });
    const [email, setEmail] = useState({ value: '', isValid: false });
    const [password, setPassword] = useState({ value: '', isValid: false });
    const [passwordConfirm, setPasswordConfirm] = useState({ value: '', isValid: false });

    const [isValid, setIsValid] = useState(false);
    
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
            case 'password':
                setPassword({ value: value, isValid: value.length > 0 });
                break;
            case 'password-confirm':
                setPasswordConfirm({ value: value, isValid: value === password.value });
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(signIn) {
            setIsValid(login.isValid && password.isValid);
        }
        else if(signUp) {
            setIsValid(login.isValid && email.isValid && password.isValid && passwordConfirm.isValid);
        }
    }, [login, email, password, passwordConfirm]);
                
    const onKeydown = ({ key }) => {
        switch (key) {
            case 'Escape':
                onCancel && onCancel();
                break;
            case 'Enter':
                signIn ? onSignIn() : onSignUp();
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    const clearInputs = () => {
        setLogin({ value: '', isValid: false });
        setEmail({ value: '', isValid: false });
        setPassword({ value: '', isValid: false });
        setPasswordConfirm({ value: '', isValid: false });
        setErrorTxt('\u00A0');
    }
    
    const onCancelClick = () => {
        clearInputs();
        onCancel && onCancel();
    }
    
    const onSignIn = async () => {
        const result = await db.signIn(login.value, password.value);

        if(result.code) {
            if (result.code === 'invalid-credentials') {
                setErrorTxt('Invalid login and/or password');
            }
            else {
                setErrorTxt('Something went wrong. Try again later');
            }
        }
        else {
            clearInputs();
            onOk && onOk();
        }
    }

    const onSignUp = async () => {
        const result = await db.signUp(login.value, email.value, password.value);

        if(result.code) {
            if (result.code === 'login-is-registered') {
                setErrorTxt('This login is already registered');
            }
            else {
                setErrorTxt('Something went wrong. Try again later');
            }
        }
        else {
            clearInputs();
            onOk && onOk();
        }
    }


    if (!isVisible) return null;

    return (
        <div>
            <Form className="position-absolute top-50 start-50 translate-middle bg-dark border border-1 border-light rounded-1 w-50 text-white p-5" style={{ zIndex: 1000, minWidth: '500px' }}>
            <FormGroup row className="mb-3">
                    <Label for="auth-login" sm={4}>Login</Label>
                    <Col sm={8}>
                        <Input id="auth-login" name="login" placeholder="Login" type="text" value={ login.value } onInput={ handleUserInput } invalid={ !login.isValid } />
                        <FormFeedback>Login is required</FormFeedback>
                    </Col>
                </FormGroup>
                { signUp && <FormGroup row className="mb-3">
                    <Label for="auth-email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input id="auth-email" name="email" placeholder="Email" type="email" value={ email.value } onInput={ handleUserInput } invalid={ !email.isValid } />
                        <FormFeedback>Email is required</FormFeedback>
                    </Col>
                </FormGroup> }
                <FormGroup row>
                    <Label for="auth-password" sm={4}>Password</Label>
                    <Col sm={8}>
                    <Input id="auth-password" name="password" placeholder="Password" type="password" value={ login.password } onInput={ handleUserInput } invalid={ !password.isValid } />
                    <FormFeedback>Password is required</FormFeedback>
                    </Col>
                </FormGroup>
                { signUp && <FormGroup row>
                    <Label for="auth-password-confirm" sm={4}>Confirm password</Label>
                    <Col sm={8}>
                    <Input id="auth-password-confirm" name="password-confirm" placeholder="Confirm password" type="password" value={ passwordConfirm.value } onInput={ handleUserInput } invalid={ !passwordConfirm.isValid } />
                    <FormFeedback>Passwords do not match</FormFeedback>
                    </Col>
                </FormGroup> }
                <Error text={ errorTxt } />
                <FormGroup row className="flex justify-content-center">
                    <Button value={ (signIn && 'Login') || (signUp && 'Register') } onClick={ signIn ? onSignIn : onSignUp } disabled={ !isValid } /> 
                    <Button value="Cancel" onClick={ onCancelClick } />
                </FormGroup>
            </Form>
        </div>
    );
}

export default Authorization;