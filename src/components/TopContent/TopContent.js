import TopCard from '../TopCard/TopCard';

import { getAsync, selectValues } from '../../app/watchesSlice';
import { addAsync } from '../../app/basketSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';

const TopContent = ({ onBuy }) => {
    const watches = useSelector(selectValues);

    useEffect(() => {
        dispatch(getAsync({ page: 1, perPage: 6, isPopular: true }));
    }, []);
    const dispatch = useDispatch();

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
                { watches && watches.map(item => <TopCard key={ item.id } watch= { item } onBuyClick={ onBuyClick } />) }
            </div>
        </div>
    );
}

export default TopContent;