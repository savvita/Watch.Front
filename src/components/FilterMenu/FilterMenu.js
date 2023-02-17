import { Input, ButtonGroup, FormGroup, Label } from 'reactstrap';

const FilterMenu = ({ title, items, onChange }) => {
    return (
        <div>
            <h3>{ title }</h3>
            <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                { 
                    items && items.map(item => 
                        <FormGroup key={ item.id } check className="pointer">
                            <Input type="checkbox" id={ `${title}${item.id}` } className="pointer" onChange={ (e) => onChange && onChange(item.id, e.target.checked) } />
                            {' '}
                            <Label check for={ `${title}${item.id}` } className="pointer">
                                { item.value }
                            </Label>
                        </FormGroup>
                    ) 
                }
            </ButtonGroup>
        </div>
    );
}

export default FilterMenu;