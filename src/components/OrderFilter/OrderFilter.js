import { Input, FormGroup, Label, ButtonGroup } from 'reactstrap';
import { useEffect, useState } from 'react';

const OrderFilter = ({ statusses, onChange }) => {

    const [filters, setFilters] = useState({ statusses: [], startDate: '', endDate: ''});

    const changeStatuses = (id) => {
        if(filters.statusses.find(x => x === id)) {
            setFilters({...filters, statusses: filters.statusses.filter(x => x !== id )});
        }
        else {
            setFilters({...filters, statusses: [...filters.statusses, id] });
        }
    }

    const setStartDate = (date) => {
        setFilters({...filters, startDate: date});
    }

    const setEndDate = (date) => {
        setFilters({...filters, endDate: date});
    }

    useEffect(() => {
        onChange && onChange(filters);
    }, [filters]);

    return (
        <div className='text-white d-flex justify-content-around'>
            <div className="me-4">
                <h3>Date from</h3>
                <FormGroup>
                    <Input name="date" type="date" onChange={ (e) => setStartDate(e.target.value) } />
                </FormGroup>
            </div>
            <div className="me-4">
                <h3>Date to</h3>
                <FormGroup>
                    <Input name="date" type="date" onChange={ (e) => setEndDate(e.target.value) } />
                </FormGroup>
            </div>
            <div className="me-4">
                <h3>Statusses</h3>
                <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                    { 
                        statusses && statusses.map(item => 
                            <FormGroup key={ item.id } check className="pointer">
                                <Input type="checkbox" id={ `status${item.id}` } className="pointer" onChange={ () => changeStatuses(item.id) } />
                                {' '}
                                <Label check for={ `status${item.id}` } className="pointer">
                                    { item.value }
                                </Label>
                            </FormGroup>
                        ) 
                    }
                </ButtonGroup>
            </div>
        </div>
    );
}

export default OrderFilter;