import PropDetailRow from '../PropDetailRow/PropDetailRow';
import ItemForm from '../ItemForm/ItemForm';

import { Table } from 'reactstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react'; 

const PropTable = ({ title, items, loadItemsAsync, createItemAsync, updateItemAsync, deleteItemAsync }) => {
    const [item, setItem] = useState({ id: '', value: '' });
    const [modal, setModal] = useState(false); 

    const loadItems = async () => {
        if(!loadItemsAsync) return;
        await loadItemsAsync();
    };

    useEffect(() => {
        loadItems();
    }, []);

    const updateItem = async (item) => {

        if(item.id === '') {
            if(!createItemAsync) return;

            await createItemAsync(item);
            await loadItems();
        }
        else {
            if(!updateItemAsync) return;

            await updateItemAsync(item);
            await loadItems();
        }
    }

    const saveItem = async (item) => {
        await updateItem(item);
        setModal(false);
    }

    const editItem = (item) => {
        setItem(item);
        setModal(true);
    }

    const deleteItem = async (item) => {
        if(!item || !deleteItemAsync) return;

        await deleteItemAsync(item.id);
        await loadItems();
    }

    return (
        <div>
        <h3 className="text-white">{ title } <FaPlusCircle onClick={ () => editItem({ id: '', value: '' })} /></h3>
        <Table dark>
            <thead>
                <tr className="text-center">
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Count</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                { items && items.map((item) => <PropDetailRow key={ item.id } item={ item } onEdit={ editItem } onDelete={ deleteItem } />) }
            </tbody>
        </Table>
        <ItemForm isVisible={ modal } item={ item } onCancel={ () => setModal(false) } onUpdate={ saveItem } />
    </div>
    );
}

export default PropTable;