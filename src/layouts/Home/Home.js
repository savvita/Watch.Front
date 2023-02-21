import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import CategoriesNav from '../../components/CategoriesNav/CategoriesNav';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectValues } from '../../app/producersSlice';

import { Row, Col } from 'reactstrap';

function Home() {
    const producers = useSelector(selectValues);


    const [buyAdded, setBuyAdded] = useState(false);

    const [isIndex, setIsIndex] = useState(true);

    // useEffect(() => {
    //     setIsReady(true);
    // }, []);

 
    // const onCategoriesChange = (id) => {
    //     filter(categories, setCategories, id);
    //     setIsIndex(false);
    // }


    return (
        <div className="d-flex flex-column page-container">
            <Header buyAdded={ buyAdded } onBasketClosed={ () => setBuyAdded(false) } />
            <CategoriesNav />
            <Row className="ps-4 flex-grow-1">
                <Col md="3" sm="12" className="border-1 border-end border-light mt-3 p-0 text-white">
                    <Sidebar />
                </Col>
                <Col md="9" sm="12">
                    <Content onBuy={ () => setBuyAdded(true) } />
                </Col>
                {/* { isReady && <Content perPage='2' isIndex={ isIndex } filters={ filters } onBuy={ () => setBuyAdded(true) } /> } */}
            </Row>
            <Footer />
        </div>
    );
}

export default Home;