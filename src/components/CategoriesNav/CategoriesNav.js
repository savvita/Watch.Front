import MediaQuery from 'react-responsive'
import { Button, ButtonGroup } from 'reactstrap';

const CategoriesNav = ({ categories, onCategoryChange }) => {
    const sm = 770;

    return ( 
        <MediaQuery minWidth={ sm }>
            <ButtonGroup className="p-3 mb-2 d-flex justify-content-center">
                { categories.map(category => <Button key={ category.id } color="light" outline onClick={ () => onCategoryChange && onCategoryChange(category.id) }>{ category.value }</Button>) }
            </ButtonGroup>
        </MediaQuery>
    );
}

export default CategoriesNav;