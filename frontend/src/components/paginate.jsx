import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false }) => {

    const navigate = useNavigate();

    const handlePages = (p) => {
        !isAdmin ? navigate(`/page/${p + 1}`) : navigate(`/admin/productlist/${p + 1}`)
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((e) => (
                    <Pagination.Item
                        key={e + 1}
                        active={e + 1 === page}
                        onClick={() => handlePages(e)}
                    >
                        {e + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    );
};

Paginate.propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    isAdmin: PropTypes.bool,
};

export default Paginate;
