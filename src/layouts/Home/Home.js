import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import CategoriesNav from '../../components/CategoriesNav/CategoriesNav';
import db from '../../database';

import { useState, useEffect } from 'react';

import { Row } from 'reactstrap';

function Home() {
    const [categories, setCategories] = useState([]);
    const [producers, setProducers] = useState([]);

    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    
    const [searchTxt, setSearchTxt] = useState(null);

    const [buyAdded, setBuyAdded] = useState(false);

    const [filters, setFilters] = useState({ categories: [], producers: [], minPrice: null, maxPrice: null, model: null });

    const [isReady, setIsReady] = useState(false);
    const [isIndex, setIsIndex] = useState(true);

    useEffect(() => {
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

        setIsReady(true);
    }, []);

    const filter = (array, setArray, id) => {
        setArray(array.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
    }

    useEffect(() => {
        setFilters({ categories: categories.filter(x => x.isChecked), producers: producers.filter(x => x.isChecked), minPrice: minPrice, maxPrice: maxPrice, model: searchTxt });
    }, [categories, producers, minPrice, maxPrice, searchTxt]);

    const onCategoriesChange = (id) => {
        filter(categories, setCategories, id);
        setIsIndex(false);
    }

    const onProducersChange = (id) => {
        filter(producers, setProducers, id);
        setIsIndex(false);
    }

    const onMinMaxPriceChange = (minPrice, maxPrice) => {
        let min = parseFloat(minPrice);
        let max = parseFloat(maxPrice);

        setMinPrice(min ?? null);
        setMaxPrice(max ?? null);
    }

    const onCategoryChange = (id) => {
        setIsIndex(false);
        setCategories(categories.map(category => { return { ...category, isChecked: category.id === id } }));
        setProducers(producers.map(producer => { return { ...producer, isChecked: false } }));
        setMinPrice(null);
        setMaxPrice(null);
        setSearchTxt(null);
    }

    const onSearch = (value) => {
        setSearchTxt(value);
    }

    return <div className="d-flex flex-column page-container">
                <Header onSearch={ onSearch } buyAdded={ buyAdded } onBasketClosed={ () => setBuyAdded(false) } />
                <CategoriesNav categories={ categories } onCategoryChange={ onCategoryChange } />
                <Row className="ps-4 flex-grow-1">
                    <Sidebar categories={ categories } producers={ producers } onCategoryChange={ onCategoriesChange } onProducerChange={ onProducersChange } onMinMaxPriceChange={ onMinMaxPriceChange } />
                    { isReady && <Content perPage='2' isIndex={ isIndex } filters={ filters } onBuy={ () => setBuyAdded(true) } /> }
                </Row>
                <Footer />
            </div>
}

export default Home;