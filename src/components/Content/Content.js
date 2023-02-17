import { useEffect, useState } from 'react';
import { Col } from 'reactstrap';

import db from '../../database';

import Card from '../Card/Card';
import Error from '../Error/Error';
import Pagination from '../Pagination/Pagination';

const Content = ({ perPage, categories, producers, model, minPrice, maxPrice }) => {
    const [watches, setWatches] = useState([]);
    const [hits, setHits] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorTxt, setErrorTxt] = useState("");

    const loadWatches = async (page) => {
        const w = await db.getWatches(page, model, categories.filter(category => category.isChecked), producers.filter(producer => producer.isChecked), minPrice, maxPrice, true, true);

        if(w === undefined) {
            setErrorTxt("Something went wrong. Sorry :(");
        }
        else if (w.hits === 0) {
            setWatches(w.value);
            setErrorTxt("Sorry. Not found :(");
        }
        else {
            setErrorTxt("");
            setWatches(w.value);
            setHits(w.hits);
            setCurrentPage(page);
            
        }
    }

    useEffect(() => {
        loadWatches(currentPage);
    });

    const onPageClick = async (page) => {
        await loadWatches(page);
    }

    const onPrevClick = async () => {
        if(currentPage > 1) {
            await loadWatches(currentPage - 1);
        }
    }

    const onNextClick = async () => {
        if(currentPage < Math.ceil(hits / perPage)) {
            await loadWatches(currentPage + 1);
        }
    }

    return (
        <Col md="9" sm="12">
            <div className="d-flex flex-wrap flex-row justify-content-center">
                { watches !== undefined && watches.map(item => <Card key={ item.id } watch= { item } />) }
                <Error text={ errorTxt } />
            </div>
            
            { watches.length > 0 && <Pagination hits={ hits } perPage={ perPage } currentPage={ currentPage } onPageClick={ onPageClick } onPrevClick={ onPrevClick } onNextClick={ onNextClick } /> }

        </Col>
    );
}

Content.defaultProps = {
    perPage: 2
};

export default Content;