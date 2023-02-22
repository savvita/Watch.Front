import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';

import no_image from './No_image_available.png';

import './Card.css';

const WatchCard = ({ watch, onBuyClick }) => {

    return (
        <Card color="dark" inverse className="m-3 border-light card" style={{ width: '18rem' }}>
            <img
                alt={ watch.model }
                src={ watch.imageUrl ?? {no_image}}
                className="card-img-top"
            />
            { watch.isPopular && <Badge color="danger" className="position-absolute top-0 end-0 fs-3">TOP</Badge> }
            <CardBody>
                <CardTitle tag="h5">{ watch.model }</CardTitle>
                <CardText>Category: { watch.category.categoryName }</CardText>
                <CardText>Producer: { watch.producer.producerName }</CardText>
            </CardBody>
     
            <ListGroup flush>
                <ListGroupItem>Price: { watch.price } &#8372;</ListGroupItem>
            </ListGroup>

            <Button color="success" onClick={ (e) => { e.stopPropagation(); e.preventDefault(); onBuyClick && onBuyClick(watch) } }>Buy</Button>
        </Card>
    );
}

export default WatchCard;