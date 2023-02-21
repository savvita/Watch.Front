import { Input, InputGroup, InputGroupText } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { setMinPrice, setMaxPrice } from '../../app/filtersSlice';


const PriceFilterMenu = () => {
    const dispatch = useDispatch();

    const onMinBlur = (e) => {
        const value = parseFloat(e.target.value);

        if(value && value >= 0) {
            dispatch(setMinPrice(value));
        }
    }

    const onMaxBlur = (e) => {
        const value = parseFloat(e.target.value);

        if(value && value >= 0) {
            dispatch(setMaxPrice(value));
        }
    }

    return (
        <div>
            <h3>Price</h3>
            <InputGroup className="pe-3 pb-2">
                <InputGroupText>Min</InputGroupText>
                <Input type="text" onBlur= { onMinBlur }/>
                <InputGroupText>&#8372;</InputGroupText>
            </InputGroup>

            <InputGroup className="pe-3 pb-2">
                <InputGroupText>Max</InputGroupText>
                <Input type="text" onBlur= { onMaxBlur } />
                <InputGroupText>&#8372;</InputGroupText>
            </InputGroup>
        </div>
    );
}

export default PriceFilterMenu;