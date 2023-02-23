import { Input, FormGroup, Label, ButtonGroup } from 'reactstrap';
import { useEffect, useState } from 'react';

const FiltersOffcanvas = ({ producers, categories, onChange }) => {

    const [filters, setFilters] = useState({ producers: [], categories: [], onSale: [], isPopular: []});

    const changeCategories = (id) => {
        if(filters.categories.find(x => x === id)) {
            setFilters({...filters, categories: filters.categories.filter(x => x !== id )});
        }
        else {
            setFilters({...filters, categories: [...filters.categories, id] });
        }
    }

    const changeProducers = (id) => {
        if(filters.producers.find(x => x === id)) {
            setFilters({...filters, producers: filters.producers.filter(x => x !== id )});
        }
        else {
            setFilters({...filters, producers: [...filters.producers, id] });
        }
    }

    const changeOnSale = (value) => {
        if(filters.onSale.indexOf(value) >= 0) {
            setFilters({...filters, onSale: filters.onSale.filter(x => x !== value )});
        }
        else {
            setFilters({...filters, onSale: [...filters.onSale, value] });
        }
    }

    const changeIsPopular = (value) => {
        if(filters.isPopular.indexOf(value) >= 0) {
            setFilters({...filters, isPopular: filters.isPopular.filter(x => x !== value )});
        }
        else {
            setFilters({...filters, isPopular: [...filters.isPopular, value] });
        }
    }

    useEffect(() => {
        onChange && onChange(filters);
    }, [filters]);

    return (
        <div className='text-white d-flex justify-content-around'>
            <div className="me-4">
                <h3>Producers</h3>
                <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                    { 
                        producers && producers.map(item => 
                            <FormGroup key={ item.id } check className="pointer">
                                <Input type="checkbox" id={ `producer${item.id}` } className="pointer" onChange={ () => changeProducers(item.id) } />
                                {' '}
                                <Label check for={ `producer${item.id}` } className="pointer">
                                    { item.value }
                                </Label>
                            </FormGroup>
                        ) 
                    }
                </ButtonGroup>
            </div>
            <div className="me-4">
                <h3>Categories</h3>
                <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                    { 
                        categories && categories.map(item => 
                            <FormGroup key={ item.id } check className="pointer">
                                <Input type="checkbox" id={ `category${item.id}` } className="pointer" onChange={ () => changeCategories(item.id) } />
                                {' '}
                                <Label check for={ `category${item.id}` } className="pointer">
                                    { item.value }
                                </Label>
                            </FormGroup>
                        ) 
                    }
                </ButtonGroup>
            </div>
            <div className="me-4">
                <h3>On sale</h3>
                <FormGroup check className="pointer">
                    <Input type="checkbox" id='onSale_yes' className="pointer" onChange={ () => changeOnSale(true) } />
                    {' '}
                    <Label check for='onSale_yes' className="pointer">Yes</Label>
                </FormGroup>
                <FormGroup check className="pointer">
                    <Input type="checkbox" id='onSale_no' className="pointer" onChange={ () => changeOnSale(false) } />
                    {' '}
                    <Label check for='onSale_no' className="pointer">No</Label>
                </FormGroup>
            </div>
            <div className="me-4">
                <h3>Popular</h3>
                <FormGroup check className="pointer">
                    <Input type="checkbox" id='popular_yes' className="pointer" onChange={ () => changeIsPopular(true) } />
                    {' '}
                    <Label check for='popular_yes' className="pointer">Yes</Label>
                </FormGroup>
                <FormGroup check className="pointer">
                    <Input type="checkbox" id='popular_no' className="pointer" onChange={ () => changeIsPopular(false) } />
                    {' '}
                    <Label check for='popular_no' className="pointer">No</Label>
                </FormGroup>
            </div>
        </div>
    );
}

export default FiltersOffcanvas;