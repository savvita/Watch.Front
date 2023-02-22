import Header from '../../components/Header/Header';
import TopContent from '../../components/TopContent/TopContent';
import Footer from '../../components/Footer/Footer';
import Carousel from '../../components/Carousel/Carousel';
import CategoriesNav from '../../components/CategoriesNav/CategoriesNav';

import { useState } from 'react';

import { Row } from 'reactstrap';

const Index = () => {
    const [buyAdded, setBuyAdded] = useState(false);

    return (
        <div className="d-flex flex-column page-container">
            <Header buyAdded={ buyAdded } onBasketClosed={ () => setBuyAdded(false) } />
            {/* <CategoriesNav /> */}

            <Carousel />


            <Row className="ps-4 flex-grow-1 border-top border-light pt-3">
                <TopContent onBuy={ () => setBuyAdded(true) } />
            </Row>
            <Footer />
        </div>
    );
}

export default Index;