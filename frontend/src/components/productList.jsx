import { Row } from 'react-bootstrap';
import products from '../../public/products';
import Product from './product';
const ProductList = () => {
    return (<>
        <h1>Latest Products</h1>
        <Row>
            {products.map((e, i) => <Product key={i} product={e} />)}
        </Row>
    </>);
}

export default ProductList;