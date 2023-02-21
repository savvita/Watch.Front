import PropTable from '../../components/PropTable/PropTable';

import { useSelector, useDispatch } from 'react-redux';
import { getAsync, selectValues, createAsync, updateAsync, deleteAsync } from '../../app/producersSlice';

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


    return <PropTable title="Producers" items={ items } loadItemsAsync={ loadProducers } createItemAsync={ createProducer } updateItemAsync={ updateProducer } deleteItemAsync={ deleteProducer }  />
}

export default Producers;