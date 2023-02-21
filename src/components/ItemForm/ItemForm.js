import Button from '../Button/Button';

import { Form, Row, Label, Col, Input, FormFeedback } from 'reactstrap';
import { useEffect, useState } from 'react'; 

import './ItemForm.css';

const ItemForm = ({ item, isVisible, onUpdate, onCancel }) => {

    const [unit, setUnit] = useState({ value: '', isValid: true });

    useEffect(() => {
        if(!item) return;
        setUnit({ value: item.value, isValid: item.value.length > 0 });
    }, [item]);

    const handleUserInput = (e) => {
        setUnit({ value: e.target.value, isValid: e.target.value.length > 0 });
    }
    
    const onClose = (e) => {
        e.preventDefault();
        onCancel && onCancel();
    }

    const onEdit = (e) => {
        e.preventDefault();
        onUpdate && onUpdate( { ...item, value: unit.value });
    }
    
    if (!isVisible) return null;

    return (
        <div className="position-absolute top-50 start-50 translate-middle bg-dark border border-1 border-light rounded-1 w-50  text-white p-5" style={{ zIndex: 2000 }}>
            <Form>
                <Row>
                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='item-title'>Title</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="item-title" type="text" placeholder="Title" value={ unit.value } onInput={ handleUserInput } invalid={ !unit.isValid } />
                            <FormFeedback>Title is required</FormFeedback>
                        </Col>
                    </Row>
                </Row>
                <Row className="flex justify-content-center">
                    <Button value="Ok" className="item-button" onClick={ onEdit } />
                    <Button value="Cancel" className="item-button" onClick={ onClose } />
                </Row>
            </Form>
        </div>
    );
}

export default ItemForm;