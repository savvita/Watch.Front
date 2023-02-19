import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const PropDetailRow = ({ item, onEdit, onDelete }) => {

    return (
        <tr>
            <th scope="row" className="text-center">{ item.id }</th>
            <td className="text-center">{ item.value }</td>
            <td className="text-center">{ item.count }</td>
            <td className="text-center"><FaEdit onClick={ () => onEdit && onEdit(item) } /></td>
            <td className="text-center"><FaTrashAlt onClick={ () => onDelete && onDelete(item) } /></td>
        </tr>
    );
}

export default PropDetailRow;