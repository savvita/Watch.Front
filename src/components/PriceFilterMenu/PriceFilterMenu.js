import { useState } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';


const PriceFilterMenu = ({ onBlur }) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    return (
        <div>
            <h3>Price</h3>
            <InputGroup className="pe-3 pb-2">
                <InputGroupText>Min</InputGroupText>
                <Input type="text" value={ minPrice } onInput={ (e) => setMinPrice(e.target.value) } onBlur= { () => onBlur && onBlur(minPrice, maxPrice) }/>
                <InputGroupText>&#8372;</InputGroupText>
            </InputGroup>

            <InputGroup className="pe-3 pb-2">
                <InputGroupText>Max</InputGroupText>
                <Input type="text" value={ maxPrice } onInput={ (e) => setMaxPrice(e.target.value) } onBlur= { () => onBlur && onBlur(minPrice, maxPrice) } />
                <InputGroupText>&#8372;</InputGroupText>
            </InputGroup>
        </div>
    );
}

export default PriceFilterMenu;