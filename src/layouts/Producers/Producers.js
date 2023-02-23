import PropTable from '../../components/PropTable/PropTable';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues, createAsync, updateAsync, deleteAsync } from '../../app/producersSlice';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Producers() {
    const items = useSelector(selectValues);

    const dispatch = useDispatch();

    const loadProducers = async () => {
        dispatch(getAsync());
    }

    const createProducer = async (item) => {
        dispatch(createAsync({ producerName: item.value }));
    }

    const updateProducer = async (item) => {
        dispatch(updateAsync({ id: item.id, producerName: item.value }));
    }

    const deleteProducer = async (id) => {
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
                    Producers
                </BreadcrumbItem>
            </Breadcrumb>
            <PropTable title="Producers" items={ items } loadItemsAsync={ loadProducers } createItemAsync={ createProducer } updateItemAsync={ updateProducer } deleteItemAsync={ deleteProducer }  />
        </>
    );
}

export default Producers;