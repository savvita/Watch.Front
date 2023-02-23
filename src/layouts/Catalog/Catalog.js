import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import CategoriesNav from '../../components/CategoriesNav/CategoriesNav';

import { useState } from 'react';

import { Row, Col } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Catalog() {
    const [buyAdded, setBuyAdded] = useState(false);

    return (
        <div className="d-flex flex-column page-container">
            <Header buyAdded={ buyAdded } onBasketClosed={ () => setBuyAdded(false) } />
            <CategoriesNav />
            <Breadcrumb className='bread ps-3'>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    Catalog
                </BreadcrumbItem>
            </Breadcrumb>
            <Row className="ps-4 flex-grow-1">
                <Col md="3" sm="12" className="border-1 border-end border-light mt-3 p-0 text-white">
                    <Sidebar />
                </Col>
                <Col md="9" sm="12">
                    <Content onBuy={ () => setBuyAdded(true) } />
                </Col>
            </Row>
            <Footer />
        </div>
    );
}

export default Catalog;