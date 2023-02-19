import no_image from './No_image_available.png';
import { FaEdit, FaTrashAlt, FaUndo } from 'react-icons/fa';

import { Input } from 'reactstrap';
import { useEffect, useState } from 'react';


const WatchDetailRow = ({ watch, onEdit, onDelete, onRestore, onSetPopular, isChecked, onCheckedChanged }) => {
    const [isRowChecked, setIsRowChecked] = useState(isChecked);

    useEffect(() => {
        setIsRowChecked(isChecked);
    },[isChecked]);

    if(!watch) {
        return null;
    }

    const switchPopular = () => {
        watch.isPopular = !watch.isPopular;
        onSetPopular && onSetPopular(watch);
    }

    const switchChecked = () => {
        onCheckedChanged && onCheckedChanged(watch, !isRowChecked);
        setIsRowChecked(!isRowChecked);
    }

    return (
        <tr>
            <th scope="row">
                <Input name="row" type="checkbox" style={{ margin: '0 auto' }} checked={ isRowChecked } onChange={ switchChecked } />
            </th>
            <td><img alt={ watch.model } src={ watch.imageUrl ?? {no_image}} className="small"
            /></td>
            <td>{ watch.producer && watch.producer.producerName }</td>
            <td>{ watch.model }</td>
            <td>{ watch.category && watch.category.categoryName }</td>
            <td>{ watch.available }</td>
            <td>{ watch.sold }</td>
            <td>{ watch.onSale ? 'true' : 'false' }</td>
            <td>{ watch.price } &#8372;</td>
            <td><Input type="checkbox" style={{ margin: '0 auto' }} checked={ watch.isPopular } onChange={ switchPopular } /></td>
            <td><FaEdit onClick={ () => onEdit && onEdit(watch)} /> <FaTrashAlt onClick={ () => onDelete && onDelete(watch) } /> <FaUndo onClick={ () => onRestore && onRestore(watch) } /></td>
        </tr>

    );
}

export default WatchDetailRow;