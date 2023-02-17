import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'reactstrap';

import no_image from './No_image_available.png';

const WatchCard = ({ watch }) => {
    return (
        <Card color="dark" inverse className="m-3 border-light" style={{ width: '18rem' }}>
            <img
                alt={ watch.model }
                src={ watch.imageUrl ?? {no_image}}
                className="card-img-top"
            />

            <CardBody>
                <CardTitle tag="h5">{ watch.model }</CardTitle>
                <CardText>Category: { watch.category.categoryName }</CardText>
                <CardText>Producer: { watch.producer.producerName }</CardText>
            </CardBody>
     
            <ListGroup flush>
                <ListGroupItem>Price: { watch.price } &#8372;</ListGroupItem>
            </ListGroup>

            <Button color="success">Buy</Button>
        </Card>
    );
}

export default WatchCard;