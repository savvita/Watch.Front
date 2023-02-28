import Watch from '../../components/Watch/Watch';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { getByIdAsync, selectValues } from '../../app/watchesSlice';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const WatchPage = () => {
    const [buyAdded, setBuyAdded] = useState(false);
    const value = useSelector(selectValues);
    const dispatch = useDispatch();

    const params = useParams();

    const [watch, setWatch] = useState({});

    
    useEffect(() => {
        dispatch(getByIdAsync(params.id));
        setWatch(value[0]);
    }, []);

    useEffect(() => {
        setWatch(value[0]);
    }, [value]);

    return (
        <div className="d-flex flex-column page-container">
            <Header buyAdded={ buyAdded } onBasketClosed={ () => setBuyAdded(false) }  />
            {/* <Breadcrumb className='bread'>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to="/catalog">Catalog</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    { watch.producer.producerName } {watch.model }
                </BreadcrumbItem>
            </Breadcrumb> */}
            <div className="flex-grow-1 border-top border-light pt-5">
                <Watch watch={ watch } onBuyClick={ () => setBuyAdded(true) } />
            </div>
            <Footer />
        </div>
    );
}

export default WatchPage;