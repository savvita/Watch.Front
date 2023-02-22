import Button from '../Button/Button';
import BasketDetail from '../BasketDetail/BasketDetail';
import Error from '../Error/Error';

import { Row, Form } from 'reactstrap';
import { useEffect, useState } from 'react';

import { getAsync, selectValue, clearAsync, updateAsync } from '../../app/basketSlice';
import { createAsync } from '../../app/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';

const Basket = ({ isVisible, onBuy, onClose }) => {
    const basket = useSelector(selectValue);
    const dispatch = useDispatch();


    const [errorTxt, setErrorTxt] = useState("\u00A0");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(getAsync());
    }, [isVisible]);

    useEffect(() => {
        let sum = 0;
        basket.details.forEach(detail => sum += detail.count * detail.unitPrice);

        setTotal(sum);
    }, [basket]);

    const onBuyClick = async (e) => {
        e.preventDefault();

        const res = await dispatch(createAsync());

        if (res.payload.code) {
            setErrorTxt("Something went wrong. Sorry :(");
        }
        else {
            dispatch(getAsync());
            alert(`Order id = ${res.payload.id}`);
            setErrorTxt("");
            setTotal(0);
            onBuy && onBuy();
        }
    }

    const onClearClick = async (e) => {
        e.preventDefault();
        const res = await dispatch(clearAsync());

        if (res.payload.code) {
            setErrorTxt("Something went wrong. Sorry :(");
        }
        else {
            dispatch(getAsync());
            setErrorTxt("");
            setTotal(0);
        }
    }

    const onCloseClick = async (e) => {
        e.preventDefault();
        if(basket.details.length > 0) {
            await dispatch(updateAsync(basket));
        }
        onClose && onClose();
    }

    const onDetailChange = async (id, count) => {
        if(!basket || !basket.details) {
            return;
        }
        
        const b = { ...basket, details: basket.details.map(detail => detail.id === id ? { ...detail, count: count } : detail) };

        await dispatch(updateAsync(b));
        await dispatch(getAsync());

        let sum = 0;
        b.details.forEach(detail => sum += detail.count * detail.unitPrice);

        setTotal(sum);
    }

    if (!isVisible) return null;

    return (
        <div className="position-absolute top-50 start-50 translate-middle bg-dark border border-1 border-light rounded-1 w-50 text-white p-5" style={{ zIndex: 2000, minWidth: "560px", maxWidth: "720px" }}>
            <Form>
                <Row>
                    { basket.details.length > 0 ? basket.details.map(detail => <BasketDetail key={ detail.id } detail={ detail } onChange={ onDetailChange } />) : <p className="text-white">Basket is empty</p> }
                </Row>
                <Row>
                    <h3 className="m-0 mt-5 pe-5 text-end">Total: { total } &#8372;</h3>
                </Row>
                <Error text={ errorTxt } />
                <Row className="flex justify-content-center">
                    <Button value="Buy" disabled={ basket.details.length === 0 } onClick={ onBuyClick }/>
                    <Button value="Clear" disabled={ basket.details.length === 0 } onClick={ onClearClick } />
                    <Button value="Close" onClick={ onCloseClick } />
                </Row>
            </Form>
        </div>

    );
}

export default Basket;