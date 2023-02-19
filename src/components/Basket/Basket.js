import Button from '../Button/Button';
import BasketDetail from '../BasketDetail/BasketDetail';
import Error from '../Error/Error';
import db from '../../database';

import { Row, Form } from 'reactstrap';
import { useEffect, useState } from 'react';

const Basket = ({ isVisible, onBuy, onClose }) => {
    const [errorTxt, setErrorTxt] = useState("\u00A0");
    const [basket, setBasket] = useState({ details: []});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const loadBasket = async () => {
            let b = await db.getBasket();
    
            if(b) {
                if(b.code) {
                    setErrorTxt("Something went wrong. Try again later");
                }
                else {
                    if(b.value) {
                        setBasket(b.value);
    
                        let sum = 0;
                        b.value.details.forEach(detail => sum += detail.count * detail.unitPrice);
    
                        setTotal(sum);
                    }
                    setErrorTxt("\u00A0");
                }
            }
        };

        loadBasket();
    }, [isVisible]);

    const onBuyClick = async (e) => {
        e.preventDefault();
        let result = await db.order();

        if(result && result.value) {
            alert(`Order id = ${result.value.id}`);
            setBasket({ details: []});
            setTotal(0);
            onBuy && onBuy();
        }
        else {
            alert(`Something went wrong. Try again later`);
        }
    }

    const onClearClick = async (e) => {
        e.preventDefault();
        await db.deleteBasket();
        setBasket({ details: []});
        setTotal(0);
    }

    const onCloseClick = async (e) => {
        e.preventDefault();
        if(basket.details.length > 0) {
            await db.updateBasket(basket);
        }
        onClose && onClose();
    }

    const onDetailChange = async (id, count) => {
        if(!basket || !basket.details) {
            return;
        }
        
        basket.details = basket.details.map(detail => detail.id === id ? { ...detail, count: count } : detail);
        setBasket(basket);

        if(basket.details.length > 0) {
            await db.updateBasket(basket);
        }

        let sum = 0;
        basket.details.forEach(detail => sum += detail.count * detail.unitPrice);

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