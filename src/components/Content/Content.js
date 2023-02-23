import token from '../../token';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Error from '../Error/Error';

import { getAsync as getWatches, selectValues as selectWatches} from '../../app/watchesSlice';
import { selectValues as selectFilters } from '../../app/filtersSlice';
import { addAsync } from '../../app/basketSlice';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Content = ({ onBuy }) => {

    const watches = useSelector(selectWatches);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWatches(filters));
    },[filters]);

    const onBuyClick = async (watch) => {
        if(!token.getToken()) {
            return;
        }

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
                { watches && watches.map(item => <Link key={ item.id } to={ `/watches/${ item.id }` } style={{ textDecoration: 'none' }}><Card watch={ item } onBuyClick={ onBuyClick } /></Link>) }
                { watches && watches.length === 0 && <Error text="Not found. Sorry :(" />}
            </div>
            { watches.length > 0 && <Pagination /> }
        </div>
    );
}

export default Content;