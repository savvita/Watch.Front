import PropDetailRow from '../PropDetailRow/PropDetailRow';
import ItemForm from '../ItemForm/ItemForm';

import { Table, Input, FormFeedback, FormGroup } from 'reactstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react'; 

const PropTable = ({ title, items, loadItemsAsync, createItemAsync, updateItemAsync, deleteItemAsync }) => {
    const [item, setItem] = useState({ id: '', value: '' });
    const [modal, setModal] = useState(false); 

    const[values, setValues] = useState([]);
    const[errorTxt, setErrorTxt] = useState('');

    const loadItems = async () => {
        if(!loadItemsAsync) return;
        await loadItemsAsync();
    };

    useEffect(() => {
        loadItems();
        setValues(items);
    }, []);

    useEffect(() => {
        setValues(items);
    }, [items]);

    useEffect(() => {
        if(values.length === 0) {
            setErrorTxt('Not found. Sorry :(');
        }
        else {
            setErrorTxt('');
        }
    }, [values]);

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

    const filter = (e) => {
        const value = e.target.value.toLowerCase();
        setValues(items.filter(x => x.value.toLowerCase().includes(value)));
    }

    return (
        <div>
        <h3 className="text-white text-center">{ title } <FaPlusCircle onClick={ () => editItem({ id: '', value: '' })} /></h3>
        <FormGroup  className="position-relative">
            <Input name="search" placeholder="Search" type="search" onInput={ filter } invalid={ values.length === 0 } />
            <FormFeedback tooltip className="text-white">{ errorTxt }</FormFeedback>
        </FormGroup>
        <Table dark className="mt-5">
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
                { values && values.map((item) => <PropDetailRow key={ item.id } item={ item } onEdit={ editItem } onDelete={ deleteItem } />) }
            </tbody>
        </Table>
        <ItemForm isVisible={ modal } item={ item } onCancel={ () => setModal(false) } onUpdate={ saveItem } />
    </div>
    );
}

export default PropTable;