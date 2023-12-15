import { Row } from 'react-bootstrap';
import Product from './product';
import propTypes from 'prop-types';

const ProductList = ({ products }) => {

    return (<>

        <Row>
            {products.map((e, i) => <Product key={i} product={e} />)}
        </Row>

    </>);
}
ProductList.propTypes = {
    products: propTypes.array
}

export default ProductList;