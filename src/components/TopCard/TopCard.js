import Button from '../Button/Button';

import { Card, CardBody, CardTitle, CardText, Badge, Row, Col, CardFooter } from 'reactstrap';

import no_image from './No_image_available.png';

import './TopCard.css';

const TopCard = ({ watch, onBuyClick }) => {
    return (
        <Card color="dark" inverse className="m-3 border-light topcard">
            <Row className="g-0">
                <Col md="4">
                    <img alt={ watch.model } src={ watch.imageUrl ?? {no_image}} className="rounded-start topcard_img" />
                </Col>
                <Col md="8">
                    <CardBody>
                        <CardTitle tag="h5">{ watch.producer.producerName } { watch.model }</CardTitle>
                        <CardText>{ watch.category.categoryName }</CardText>
                        <CardText tag="h3" className="topcard_price">Price: { watch.price } &#8372;</CardText>
                    </CardBody>
                    <CardFooter className="topcard_footer d-flex">
                        <Button onClick={ (e) => { e.stopPropagation(); e.preventDefault(); onBuyClick && onBuyClick(watch) } } value="Buy" className="card_btn flex-grow-1" />
                    </CardFooter>
                </Col>
            </Row>
            { watch.isPopular && <Badge color="danger" className="position-absolute top-0 end-0 fs-6">TOP</Badge> }

        </Card>

    );
}

export default TopCard;