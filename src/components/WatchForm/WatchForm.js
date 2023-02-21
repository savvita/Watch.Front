import Button from '../Button/Button';
import Error from '../Error/Error';

import { useEffect, useState } from 'react';
import { Form, Row, Label, Col, Input, FormFeedback } from 'reactstrap';

import { getAsync as getCategories, selectValues as selectCategories } from '../../app/categoriesSlice';
import { getAsync as getProducers, selectValues as selectProducers } from '../../app/producersSlice';
import { getAllAsync, createAsync, updateAsync } from '../../app/watchesSlice';
import { useSelector, useDispatch } from 'react-redux';


const WatchForm = ({ watch, isVisible, onClose }) => {
    const [errorTxt, setErrorTxt] = useState("");

    const categories = useSelector(selectCategories);
    const producers = useSelector(selectProducers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducers());
    }, []);


    const [producerId, setProducerId] = useState({ value: '', isValid: true });
    const [categoryId, setCategoryId] = useState({ value: '', isValid: true });
    const [model, setModel] = useState({ value: '', isValid: true });
    const [available, setAvailable] = useState({ value: '', isValid: true });
    const [price, setPrice] = useState({ value: '', isValid: true });
    const [imageUrl, setImageUrl] = useState({ value: '', isValid: true });

    useEffect(() => {
        if (!watch) return;
        setCategoryId({ value: watch.category.id, isValid: watch.category.id > 0 });
        setProducerId({ value: watch.producer.id, isValid: watch.producer.id > 0 });
        setModel({ value: watch.model, isValid: watch.model.length > 0 });
        setAvailable({ value: watch.available, isValid: watch.available >= 0 });
        setPrice({ value: watch.price, isValid: watch.price >= 0 });
        setImageUrl({ value: watch.imageUrl, isValid: true });
    }, [watch]);

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const num = parseFloat(value);
        const numInt = parseInt(value);

        switch (name) {
            case 'categoryId':
                setCategoryId({ value: value, isValid: numInt > 0 });
                break;
            case 'producerId':
                setProducerId({ value: value, isValid: numInt > 0 });
                break;
            case 'model':
                setModel({ value: value, isValid: value.length > 0 });
                break;
            case 'available':
                setAvailable({ value: numInt, isValid: numInt >= 0 });
                break;
            case 'price':
                setPrice({ value: num, isValid: num >= 0 });
                break;
            case 'imageUrl':
                setImageUrl({ value: value, isValid: true });
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
        let res;

        if (watch.id === '') {
            let w = {
                "model": model.value,
                "price": price.value,
                "category": {
                    "id": parseInt(categoryId.value)
                },
                "producer": {
                    "id": parseInt(producerId.value)
                },
                "available": available.value,
                "onSale": watch.onSale,
                "sold": watch.sold ?? 0,
                "isPopular": watch.isPopular,
                "imageUrl": imageUrl.value
            };
            res = await dispatch(createAsync(w));
        }
        else {
            let w = {
                "id": watch.id,
                "model": model.value,
                "price": price.value,
                "category": {
                    "id": parseInt(categoryId.value)
                },
                "producer": {
                    "id": parseInt(producerId.value)
                },
                "available": available.value,
                "onSale": watch.onSale,
                "sold": watch.sold ?? 0,
                "isPopular": watch.isPopular,
                "imageUrl": imageUrl.value
            };
            res = await dispatch(updateAsync(w));
        }

        if (res.payload.code) {
            if (res.payload.code === "login-is-registered") {
                setErrorTxt("Something went wrong. Sorry :(");
            }
        }
        else {
            dispatch(getAllAsync());
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
                            <Label for='watchProducer'>Producer</Label>
                        </Col>
                        <Col sm="10">
                            <Input type="select" id="watchProducer" name="producerId" value={producerId.value} onChange={handleUserInput} invalid={!producerId.isValid}>
                                <option value="">Choose...</option>
                                {producers && producers.map(producer => <option key={producer.id} value={producer.id}>{producer.value}</option>)}
                            </Input>
                            <FormFeedback>Producer is required</FormFeedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='watchModel'>Model</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="watchModel" type="text" name="model" placeholder="Model" value={model.value} onInput={handleUserInput} invalid={!model.isValid} />
                            <FormFeedback>Model is required</FormFeedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='watchCategory'>Category</Label>
                        </Col>
                        <Col sm="10">
                            <Input type="select" id="watchCategory" name="categoryId" value={categoryId.value} onChange={handleUserInput} invalid={!categoryId.isValid}>
                                <option value={0}>Choose...</option>
                                {categories && categories.map(category => <option key={category.id} value={category.id}>{category.value}</option>)}
                            </Input>
                            <FormFeedback>Category is required</FormFeedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='watchAvailable'>Available</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="watchAvailable" type="number" name="available" placeholder="Available" value={available.value} onInput={handleUserInput} invalid={!available.isValid} min="0" />
                            <FormFeedback>Cannot be less than zero</FormFeedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='watchPrice'>Price</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="watchPrice" type="text" name="price" placeholder="Price" value={price.value} onInput={handleUserInput} invalid={!price.isValid} />
                            <FormFeedback>Cannot be less than zero</FormFeedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm="2">
                            <Label for='watchImage'>Image URL</Label>
                        </Col>
                        <Col sm="10">
                            <Input id="watchImage" type="text" name="imageUrl" placeholder="Image URL" value={imageUrl.value} onInput={handleUserInput} />
                        </Col>
                    </Row>
                </Row>
                <Error text={errorTxt} />
                <Row className="flex justify-content-center">
                    <Button value="Ok" className="watch-button" onClick={onSaveClick} />
                    <Button value="Cancel" className="watch-button" onClick={onCloseClick} />
                </Row>
            </Form>
        </div>
    );
}

export default WatchForm;