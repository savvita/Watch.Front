import { useEffect } from 'react';

import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

import { getAsync as getWatches, selectValues as selectWatches} from '../../app/watchesSlice';
import { selectValues as selectFilters } from '../../app/filtersSlice';
import { addAsync } from '../../app/basketSlice';
import { useSelector, useDispatch } from 'react-redux';

const Content = ({ onBuy }) => {

    const watches = useSelector(selectWatches);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWatches(filters));
    },[filters]);

    const onBuyClick = async (watch) => {
        let result = await dispatch(addAsync(watch));
        if(!result.code) {
            onBuy && onBuy();
        }
        else 
        {
            alert("Something went wrong. Try again later");
        }
    }

    return (
        <div>
            <div className="d-flex flex-wrap flex-row justify-content-center">
                { watches && watches.map(item => <Card key={ item.id } watch= { item } onBuyClick={ onBuyClick } />) }
            </div>
            { watches.length > 0 && <Pagination /> }
        </div>
    );
}

export default Content;