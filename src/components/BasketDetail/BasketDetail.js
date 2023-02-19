import db from '../../database';

import { useEffect, useState } from 'react';
import { Row, Col, Input } from 'reactstrap';

import no_image from './No_image_available.png';

const BasketDetail = ({ detail, onChange }) => {
    const [watch, setWatch] = useState({ });
    const [count, setCount] = useState(0);

    useEffect(() => {
        const loadWatch = async () => {
            let w = await db.getWatch(detail.watchId);

            if(w !== null && w.value) {
                setWatch(w.value);
                setCount(detail.count);
            }
        }

        loadWatch();
    }, []);

    const onInput = (e) => {
        setCount(e.target.value);
        onChange && onChange(detail.id, e.target.value);
    }

    return (
        <Row className="mb-3">
            <Col xs="3"><img alt={watch.model} src={watch.imageUrl ?? { no_image }} className="card-img-top small" /></Col>
            <Col xs="9">
                <Row><h5>{`${watch.producer && watch.producer.producerName} ${watch.model}`}</h5></Row>
                <Row>
                    <Col><p className="mt-2">Price: {watch.price} &#8372;</p></Col>
                    <Col><Input type="number" min="0" max={watch.available} value={ count } onInput={ onInput } /></Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BasketDetail;