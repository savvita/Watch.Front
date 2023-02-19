import WatchDetailRow from '../WatchDetailRow/WatchDetailRow';
import WatchForm from '../WatchForm/WatchForm';
import Error from '../Error/Error';
import db from '../../database';

import { Table, Input } from 'reactstrap';
import { FaPlusCircle} from 'react-icons/fa';
import { useEffect, useState } from 'react'; 

const WatchesTable = () => {
    const [watches, setWatches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [producers, setProducers] = useState([]);
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

    const [errorTxt, setErrorTxt] = useState();
    
    const [modal, setModal] = useState(false); 

    const loadWatches = async () => {
        const res = await db.getAllWatches();

        if(res) {
            if(res.value) {
                setWatches(res.value);
                setErrorTxt("");
            }
        }
        else {
            setErrorTxt("Something went wrong. Try again later");
        }
    };

    useEffect(() => {
        loadWatches();

        const loadCategories = async () => {
            const c = await db.getCategories();

            if(c !== undefined) {
                setCategories(c.value.map(category => { return { id: category.key.id, value: category.key.categoryName, isChecked: false} }));
            }
        }

        const loadProducers = async () => {
            const c = await db.getProducers();

            if(c !== undefined) {
                setProducers(c.value.map(producer => { return { id: producer.key.id, value: producer.key.producerName, isChecked: false} }));
            }
        }

        loadCategories();
        loadProducers();
    }, []);

    const onCheckedChanged = (watch, isSelected) => {
        if(isSelected) {
            setSelected([...selected, watch]);
        }
        else {
            setSelected(selected.filter(w => w.id !== watch.id));
        }
    }

    const updateWatch = async (watch) => {
        if(watch.id === '') {

            const w = {
                "model": watch.model,
                "price": watch.price,
                "category": {
                  "id": parseInt(watch.category.id)
                },
                "producer": {
                  "id": parseInt(watch.producer.id)
                },
                "available": watch.available,
                "onSale": watch.onSale,
                "sold": 0,
                "isPopular": watch.isPopular,
                "imageUrl": watch.imageUrl
            }
            await db.createWatch(w);
            await loadWatches();
        }
        else {
            await db.updateWatch(watch);
            await loadWatches();
        }
    }

    const saveWatch = async (watch) => {
        await updateWatch(watch);
        setModal(false);
    }

    const editWatch = (watch) => {
        setWatch(watch);
        setModal(true);
    }

    const deleteWatch = async () => {
        for(let w of selected) {
            await db.deleteWatch(w.id);
        }
        setSelected([]);
        setIsChecked(false);
        await loadWatches();
    }
    
    const restoreWatch = async () => {
        for(let w of selected) {
            await db.restoreWatch(w.id);
        }
        setSelected([]);
        setIsChecked(false);
        await loadWatches();
    }

    const addWatch = () => {
        editWatch({ 
            "id": '',
            "model": "",
            "price": '0',
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
        })
    }

    return (
        <div>
        <h3 className="text-white">Watches <FaPlusCircle onClick={ addWatch } /></h3>
        <Table dark>
            <thead>
                <tr className="text-center">
                    <th scope="col">
                        <Input type="checkbox" style={{ margin: '0 auto' }} checked={ isChecked } onChange={ () => setIsChecked(!isChecked) } />
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
                </tr>
            </thead>
            <tbody>
                { watches.map(x => <WatchDetailRow key={ x.id } watch={ x } onSetPopular={ updateWatch } onEdit={ editWatch } onDelete={ deleteWatch } onRestore={ restoreWatch } isChecked={ isChecked } onCheckedChanged={ onCheckedChanged } />) }
            </tbody>
        </Table>
        <Error text={ errorTxt } />
        <WatchForm isVisible={ modal } watch={ watch } onCancel={ () => setModal(false) } onUpdate={ saveWatch } producers={ producers} categories={ categories } />
    </div>
    );
}

export default WatchesTable;