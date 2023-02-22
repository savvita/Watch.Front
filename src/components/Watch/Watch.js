import WatchInfo from '../WatchInfo/WatchInfo';
import no_image from './No_image_available.png';

import { Row, Col, Badge, Button } from 'reactstrap';

import './Watch.css';
import { useEffect, useState } from 'react';

const Watch = ({ watch, onBuyClick }) => {
    const [discount, setDiscount] = useState(0);
    
    useEffect(() => {
        setDiscount(Math.floor(Math.random() * 20));
    }, [watch]);


    return (
        <div>
            { watch && 
                <Row>
                    <Col sm="4" md="2" lg="1" className="position-relative">
                        <div className="border border-light rounded-2 watch_img_container">
                            <img className="watch_img__small rounded-2" alt={ watch.model } src={ watch.imageUrl ?? {no_image} } />
                        </div>
                    </Col>
                    <Col sm="8" md="4" lg="3">
                        <div className="position-relative">
                            <img className="watch_img rounded-2" alt={ watch.model } src={ watch.imageUrl ?? {no_image} } />
                            { discount > 0 && <Badge color="danger" className="position-absolute top-0 end-0 fs-3">-{ discount }%</Badge> }
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="8">
                        <h2 className="text-white mb-0">{ watch.producer && watch.producer.producerName } { watch.model }</h2>
                        <span className="text-muted">(Code: { watch.id })</span>
                        { watch.available > 0 && watch.onSale && <p className="text-success m-0 watch_stock">In stock</p> }
                        { discount > 0 && <p className="text-white fs-5 text-muted m-0 mt-3">Old price: <span className="watch_old-price">{ Math.ceil(watch.price + watch.price * discount / 100) } &#8372;</span></p> }
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="text-white fs-2 m-0">New price: { watch.price } &#8372;</p>
                            <Button onClick={ () => onBuyClick && onBuyClick(watch) } color="danger" className="ms-5" style={{ padding: '5px 50px'}}>Buy</Button>
                        </div>
                        <p className="text-white mt-3">Ut pharetra porttitor ex dignissim luctus. Proin volutpat, purus ut vehicula consequat, felis metus maximus ligula, vitae rhoncus felis ligula quis mauris. Nulla cursus metus rutrum elit ultricies, nec pretium lectus gravida. Morbi vel suscipit ante, et venenatis dolor. Nunc ac dui at nisl mattis tincidunt. Pellentesque sollicitudin dictum diam non faucibus. Proin quis blandit leo. Sed sit amet urna erat. Fusce viverra rhoncus nisi, et porta nunc fermentum ut. Maecenas mauris diam, pharetra laoreet nunc vel, fringilla tristique diam. Phasellus pulvinar lorem non ligula tincidunt, nec ullamcorper ligula cursus. </p>
                    </Col>
                </Row> 
            }
            <Row>
                <WatchInfo watch={ watch } className="mt-5" />
            </Row>
        </div>
    );
}

export default Watch;