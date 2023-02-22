import WatchDetailRow from '../WatchDetailRow/WatchDetailRow';
import WatchForm from '../WatchForm/WatchForm';

import { Table, Input } from 'reactstrap';
import { FaPlusCircle} from 'react-icons/fa';
import { useEffect, useState } from 'react'; 

import { getAllAsync as getWatches, selectValues as selectWatches } from '../../app/watchesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAsync, deleteAsync, restoreAsync } from '../../app/watchesSlice';

const WatchesTable = () => {
    const watches = useSelector(selectWatches);
    const dispatch = useDispatch();

    const [selected, setSelected] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [watch, setWatch] = useState({ 
        "id": '',
        "model": "",
        "price": 0,
        "category": {
            "id": '',
            "categoryName": ""
        },
        "producer": {
            "id": '',
            "producerName": ""
        },
        "available": 0,
        "onSale": false,
        "sold": 0,
        "isPopular": false,
        "imageUrl": '' 
    });
    
    const [modal, setModal] = useState(false); 

    useEffect(() => {
        dispatch(getWatches());
    }, []);

    const showForm = (watch) => {
        setWatch(watch);
        setModal(true);
    }


    const onCheckedChanged = (watch, isSelected) => {
        if(isSelected) {
            setSelected([...selected, watch]);
        }
        else {
            setSelected(selected.filter(w => w.id !== watch.id));
        }
    }

    const deleteSelected = async () => {
        for(let w of selected) {
            await dispatch(deleteAsync(w.id));
        }
        setIsChecked(false);
        dispatch(getAllAsync());
    }
    
    const restoreSelected = async () => {
        for(let w of selected) {
            await dispatch(restoreAsync(w.id));
        }
        setIsChecked(false);
        dispatch(getAllAsync());
    }

    const showAddNewForm = () => {
        showForm({ 
            "id": '',
            "model": "",
            "price": '',
            "category": {
                "id": '',
                "categoryName": ""
            },
            "producer": {
                "id": '',
                "producerName": ""
            },
            "available": '',
            "onSale": false,
            "sold": 0,
            "isPopular": false,
            "imageUrl": '' 
        });
    }

    return (
    <div className="mt-3">
        <h3 className="text-white">Watches <FaPlusCircle onClick={ showAddNewForm } /></h3>
        <Table dark style={{ minWidth: '300px' }}>
            <thead>
                <tr className="text-center">
                    <th scope="col">
                        <Input type="checkbox" style={{ margin: '0 auto' }}  />
                    </th>
                    <th scope="col">Image</th>
                    <th scope="col">Producer</th>
                    <th scope="col">Model</th>
                    <th scope="col">Category</th>
                    <th scope="col">Available</th>
                    <th scope="col">Sold</th>
                    <th scope="col">On sale</th>
                    <th scope="col">Price</th>
                    <th scope="col">Popular</th>
                    <th scope="col">Actions</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { watches.map(x => <WatchDetailRow key={ x.id } watch={ x } onEditClick={ showForm } onRestore={ restoreSelected } onDelete={ deleteSelected } onCheckedChanged={ onCheckedChanged } isChecked={ isChecked } />) }
            </tbody>
        </Table>
        <WatchForm isVisible={ modal } watch={ watch } onClose={ () => setModal(false) } /> 
    </div>
    );
}

export default WatchesTable;