import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetCatgoriesQuery } from '../features/slices/productsApiSlice';
import Loader from './Loader';
const Catgories = () => {
    const { data: categories, isLoading, error } = useGetCatgoriesQuery()
    return (<>
        {isLoading ? <Loader width='50px' height='50px' /> : error ? "" : <NavDropdown title="Categories" id="categories-dropdown">
            {categories.map((category) => (
                <NavDropdown.Item
                    key={category}
                    as={Link}
                    to={`/category/${category.id}`}
                >
                    {category}
                </NavDropdown.Item>
            ))}
        </NavDropdown>}

    </>);
}

export default Catgories;