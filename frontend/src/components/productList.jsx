import { Row } from 'react-bootstrap';
import axios from 'axios';
import Product from './product';
import { useEffect, useState } from 'react';
const ProductList = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get('/api/products/')
            setProducts(data.data)
        }
        getData();
    }, [])
    return (<>
        <h1>Latest Products</h1>
        <Row>
            {products.map((e, i) => <Product key={i} product={e} />)}
        </Row>
    </>);
}

export default ProductList;