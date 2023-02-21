import Error from '../Error/Error';

import no_image from './No_image_available.png';

import { FaEdit, FaTrashAlt, FaUndo } from 'react-icons/fa';

import { Input } from 'reactstrap';
import { useEffect, useState } from 'react';

import { getAllAsync, updateAsync } from '../../app/watchesSlice';
import { useDispatch } from 'react-redux';


const WatchDetailRow = ({ watch, onRestore, onDelete, isChecked, onCheckedChanged, onEditClick }) => {
    const dispatch = useDispatch();

    const [isRowChecked, setIsRowChecked] = useState(isChecked);
    const [errorTxt, setErrorTxt] = useState("");

    useEffect(() => {
        setIsRowChecked(isChecked);
    }, [isChecked]);

    if (!watch) {
        return null;
    }

    const switchPopular = async () => {
        const w = { ...watch, isPopular: !watch.isPopular };
        const res = await dispatch(updateAsync(w));

        if (res.payload.code) {
            if (res.payload.code === "login-is-registered") {
                setErrorTxt("Something went wrong. Sorry :(");
            }
        }
        else {
            dispatch(getAllAsync());
            setErrorTxt("");
        }
    }

    const switchChecked = () => {
        onCheckedChanged && onCheckedChanged(watch, !isRowChecked);
        setIsRowChecked(!isRowChecked);
    }

    return (
        <tr>
            <th scope="row">
                <Input name="row" type="checkbox" style={{ margin: '0 auto' }} checked={isRowChecked} onChange={switchChecked} />
            </th>
            <td><img alt={watch.model} src={watch.imageUrl ?? { no_image }} className="small"
            /></td>
            <td>{watch.producer && watch.producer.producerName}</td>
            <td>{watch.model}</td>
            <td>{watch.category && watch.category.categoryName}</td>
            <td>{watch.available}</td>
            <td>{watch.sold}</td>
            <td>{watch.onSale ? 'true' : 'false'}</td>
            <td>{watch.price} &#8372;</td>
            <td><Input type="checkbox" style={{ margin: '0 auto' }} checked={watch.isPopular} onChange={switchPopular} /></td>
            <td><FaEdit onClick={() => onEditClick && onEditClick(watch)} /> <FaTrashAlt onClick={onDelete} /> <FaUndo onClick={onRestore} /></td>
            <td><Error text={ errorTxt } /></td>
        </tr>

    );
}

export default WatchDetailRow;