import PropTable from '../../components/PropTable/PropTable';
import db from '../../database';


function Categories() {

    const loadCategories = async () => {
        const c = await db.getCategories();

        if (c !== undefined) {
            return c.value.map(category => { return { id: category.key.id, value: category.key.categoryName, count: category.value } });
        }

        return [];
    }

    const createCategory = async (item) => {
        await db.createCategory({ categoryName: item.value });
    }

    const updateCategory = async (item) => {
        await db.updateCategory({ id: item.id, categoryName: item.value });
    }


    return <PropTable title="Categories" loadItemsAsync={ loadCategories } createItemAsync={ createCategory } updateItemAsync={ updateCategory } deleteItemAsync={ db.deleteCategory } />
}

export default Categories;