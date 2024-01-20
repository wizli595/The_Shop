import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Paginate = ({ pages, page, isAdmin = false, keyword = "", category = "" }) => {

    const navigate = useNavigate();

    const handlePages = (p) => {
        !isAdmin
            ? navigate(
                keyword
                    ? `/search/${keyword}/page/${p + 1}`
                    : category
                        ? `/category/${category}/page/${p + 1}`
                        : `/page/${p + 1}`
            )
            : navigate(`/admin/productlist/${p + 1}`);
    };
    useEffect(() => {
        if (page > pages) {
            navigate("/");
        }
    }, [page, pages, navigate]);

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
    keyword: PropTypes.string,
    category: PropTypes.string,
};

export default Paginate;
