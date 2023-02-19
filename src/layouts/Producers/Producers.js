import PropTable from '../../components/PropTable/PropTable';
import db from '../../database';


function Producers() {

    const loadProducers = async () => {
        const c = await db.getProducers();

        if (c !== undefined) {
            return c.value.map(producer => { return { id: producer.key.id, value: producer.key.producerName, count: producer.value } });
        }

        return [];
    }

    const createProducer = async (item) => {
        await db.createProducer({ producerName: item.value });
    }

    const updateProducer = async (item) => {
        await db.updateProducer({ id: item.id, producerName: item.value });
    }


    return <PropTable title="Producers" loadItemsAsync={ loadProducers } createItemAsync={ createProducer } updateItemAsync={ updateProducer } deleteItemAsync={ db.deleteProducer } />
}

export default Producers;