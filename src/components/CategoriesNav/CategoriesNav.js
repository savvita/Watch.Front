import MediaQuery from 'react-responsive'
import { Button, ButtonGroup } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync as getCategories, selectValues as selectCategories, switchChecked as switchCategory, uncheckAll as uncheckCategories } from '../../app/categoriesSlice';
import { uncheckAll as uncheckProducers } from '../../app/producersSlice';
import { setModel, setMinPrice, setMaxPrice } from '../../app/filtersSlice';

import { useEffect } from 'react';

const CategoriesNav = () => {
    const sm = 770;

    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    const onCategoryChange = (id) => {
        dispatch(uncheckCategories());
        dispatch(switchCategory(id));
        dispatch(uncheckProducers());
        dispatch(setMinPrice(null));
        dispatch(setMaxPrice(null));
        dispatch(setModel(null));
    }

    return ( 
        <MediaQuery minWidth={ sm }>
            <ButtonGroup className="p-3 mb-2 d-flex justify-content-center">
                { categories.map(category => <Button key={ category.id } color="light" outline onClick={ () => onCategoryChange && onCategoryChange(category.id) }>{ category.value }</Button>) }
            </ButtonGroup>
        </MediaQuery>
    );
}

export default CategoriesNav;