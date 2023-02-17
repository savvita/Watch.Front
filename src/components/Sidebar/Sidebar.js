import FilterMenu from '../FilterMenu/FilterMenu';
import PriceFilterMenu from '../PriceFilterMenu/PriceFilterMenu';

import { Col } from 'reactstrap';



const Sidebar = ({ categories, producers, onCategoryChange, onProducerChange, onMinMaxPriceChange }) => {
    return (
        <Col md="3" sm="12" className="border-1 border-end border-light mt-3 p-0 text-white">
            <div>
                <PriceFilterMenu onBlur={ onMinMaxPriceChange } />

                <FilterMenu title="Producers" onChange={ onProducerChange } items={ producers } />

                <FilterMenu title="Categories" onChange={ onCategoryChange } items={ categories } />
            </div>
        </Col>
    );
}

export default Sidebar;