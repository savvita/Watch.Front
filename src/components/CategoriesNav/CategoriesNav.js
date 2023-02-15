import MediaQuery from 'react-responsive'
import { Button, ButtonGroup } from 'reactstrap';

import './CategoriesNav.css';

const CategoriesNav = ({ categories, onClick }) => {
    const sm = 770;

    return ( 
        <MediaQuery minWidth={ sm }>
            <ButtonGroup className="p-3 mb-2 d-flex justify-content-center">
                { categories.map(category => <Button key={ category.key.id } color="light" outline onClick={ onClick }>{ category.key.categoryName }</Button>) }
            </ButtonGroup>
        </MediaQuery>
    );
}

export default CategoriesNav;