import PropTable from '../../components/PropTable/PropTable';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues, createAsync, updateAsync, deleteAsync } from '../../app/categoriesSlice';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Categories() {
    const items = useSelector(selectValues);

    const dispatch = useDispatch();

    const loadCategories = async () => {
        dispatch(getAsync());
    }

    const createCategory = async (item) => {
        dispatch(createAsync({ categoryName: item.value }));
    }

    const updateCategory = async (item) => {
        dispatch(updateAsync({ id: item.id, categoryName: item.value }));
    }

    const deleteCategory = async (id) => {
        dispatch(deleteAsync(id));
    }


    return (
        <>
            <Breadcrumb className='bread'>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to="/manager">Manager</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    Categories
                </BreadcrumbItem>
            </Breadcrumb>
            <PropTable title="Categories" items={ items } loadItemsAsync={ loadCategories } createItemAsync={ createCategory } updateItemAsync={ updateCategory } deleteItemAsync={ deleteCategory }  />
        </>
    );
}

export default Categories;