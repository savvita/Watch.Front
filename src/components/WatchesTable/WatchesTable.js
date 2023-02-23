import WatchDetailRow from '../WatchDetailRow/WatchDetailRow';
import WatchForm from '../WatchForm/WatchForm';

import { Table, Input, FormFeedback, FormGroup, NavbarToggler, Navbar, Collapse } from 'reactstrap';
import { FaPlusCircle} from 'react-icons/fa';
import { useEffect, useState } from 'react'; 

import { getAllAsync as getWatches, selectValues as selectWatches } from '../../app/watchesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAsync, deleteAsync, restoreAsync } from '../../app/watchesSlice';
import { getAsync as getProducers, selectValues as selectProducers } from '../../app/producersSlice';
import { getAsync as getCategories, selectValues as selectCategories, switchChecked as switchCategory} from '../../app/categoriesSlice';
import FiltersOffcanvas from '../FiltersOffcanvas/FiltersOffcanvas';

const WatchesTable = () => {
    const values = useSelector(selectWatches);
    
    const producers = useSelector(selectProducers);
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();


    const[watches, setWatches] = useState([]);
    const[errorTxt, setErrorTxt] = useState([]);
    const [filters, setFilters] = useState({ model: '', producers: [], categories: [], onSale: [], isPopular: []});

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
        dispatch(getProducers());
        dispatch(getCategories());
        setWatches(values);
    }, []);

    useEffect(() => {
        setWatches(values);
    }, [values]);

    useEffect(() => {
        if(watches.length === 0) {
            setErrorTxt('Not found. Sorry :(');
        }
        else {
            setErrorTxt('');
        }
    }, [watches]);

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
   
    useEffect(() => {
        let w = values;
        
        if(filters.model) {
            w = values.filter( x => 
                x.model.toLowerCase().includes(filters.model));
        }

        if(filters.categories.length > 0) {
            w = w.filter(x => filters.categories.includes(x.category.id));
        }

        if(filters.producers.length > 0) {
            w = w.filter(x => filters.producers.includes(x.producer.id));
        }

        if(filters.onSale.length > 0) {
            w = w.filter(x => filters.onSale.includes(x.onSale));
        }

        if(filters.isPopular.length > 0) {
            w = w.filter(x => filters.isPopular.includes(x.isPopular));
        }

        setWatches(w);
    }, [filters]);

    const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

    return (
    <div className="mt-3">
        <h3 className="text-white text-center">Watches <FaPlusCircle onClick={ showAddNewForm } /></h3>
        <Navbar color="faded" light>
            <NavbarToggler onClick={toggleNavbar} className="me-2" style={{ backgroundColor: '#fff', padding: '5px 20px' }}>Filters</NavbarToggler>
            <Collapse isOpen={!collapsed} navbar>
            <FiltersOffcanvas categories={ categories } producers={ producers } onChange={ (items) => setFilters({...items, model: filters.model }) } />
            </Collapse>
        </Navbar>

        <FormGroup  className="position-relative">
            <Input name="search" placeholder="Search" type="search" onInput={ (e) => setFilters({ ...filters, model: e.target.value.toLowerCase() }) } invalid={ watches.length === 0 } />
            <FormFeedback tooltip className="text-white">{ errorTxt }</FormFeedback>
        </FormGroup>
        <Table dark style={{ minWidth: '300px' }} className="mt-5">
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