import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetCatgoriesQuery } from '../features/slices/productsApiSlice';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
const Catgories = () => {
    const { data: categories, isLoading, error } = useGetCatgoriesQuery();

    const { t } = useTranslation();

    return (<>
        {isLoading ? <Loader width='50px' height='50px' /> : error ? "" : <NavDropdown title={t("Categories")} id="categories-dropdown">
            {categories.map((category) => (
                <NavDropdown.Item
                    key={category}
                    as={Link}
                    to={`/category/${category}`}
                >
                    {category}
                </NavDropdown.Item>
            ))}
        </NavDropdown>}

    </>);
};

export default Catgories;