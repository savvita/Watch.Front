import FilterMenu from '../FilterMenu/FilterMenu';
import PriceFilterMenu from '../PriceFilterMenu/PriceFilterMenu';

import { Col } from 'reactstrap';



const Sidebar = ({ categories, producers, onCategoryChange, onProducerChange, onMinMaxPriceChange }) => {
    return (
        <Col md="3" sm="12" className="border-1 border-end border-light mt-3 p-0 text-white">
            <div>
                <PriceFilterMenu onBlur={ onMinMaxPriceChange } />

                <FilterMenu title="Producers" onChange={ onProducerChange } items={ producers && producers.map(producer => { return { id: producer.key.id, value: producer.key.producerName }})} />

                <FilterMenu title="Categories" onChange={ onCategoryChange } items={ categories && categories.map(category => { return { id: category.key.id, value: category.key.categoryName }})} />
            </div>
        </Col>
    );
}

export default Sidebar;