import TopCard from '../TopCard/TopCard';
import token from '../../token';

import { getAsync, selectValues } from '../../app/watchesSlice';
import { addAsync } from '../../app/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';

const TopContent = ({ onBuy }) => {
    const watches = useSelector(selectValues);

    useEffect(() => {
        dispatch(getAsync({ page: 1, perPage: 6, isPopular: true }));
    }, []);
    const dispatch = useDispatch();

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
                { watches && watches.map(item => <Link key={ item.id } to={ `/watches/${ item.id }` } style={{ textDecoration: 'none' }}><TopCard watch= { item } onBuyClick={ onBuyClick } /></Link>) }
            </div>
        </div>
    );
}

export default TopContent;