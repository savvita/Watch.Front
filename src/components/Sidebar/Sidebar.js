import FilterMenu from '../FilterMenu/FilterMenu';
import PriceFilterMenu from '../PriceFilterMenu/PriceFilterMenu';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync as getProducers, selectValues as selectProducers, switchChecked as switchProducer } from '../../app/producersSlice';
import { getAsync as getCategories, selectValues as selectCategories, switchChecked as switchCategory} from '../../app/categoriesSlice';
import { setProducers, setCategories, setPage } from '../../app/filtersSlice';
import { useEffect } from 'react';

const Sidebar = () => {
    const producers = useSelector(selectProducers);
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducers());
        dispatch(getCategories());
    }, []);

    const onProducerChange = (id) => {
        dispatch(switchProducer(id));
    }

    const onCategoryChange = (id) => {
        dispatch(switchCategory(id));
    }

    useEffect(() => {
        dispatch(setProducers(producers));
        dispatch(setCategories(categories));
        dispatch(setPage(1));
    },[producers, categories]);

    return (
        <div>
            <PriceFilterMenu />
            <FilterMenu title="Producers" onChange={ onProducerChange } items={ producers } />
            <FilterMenu title="Categories" onChange={ onCategoryChange } items={ categories } />
        </div>
    );
}

export default Sidebar;