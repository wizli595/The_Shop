import { Row } from 'react-bootstrap';
import Product from './product';
import { useGetProductsQuery } from '@/features/slices/productsApiSlice';
import Loader from './Loader';
import Message from './message';
const ProductList = () => {
    const { data: products, isLoading, err } = useGetProductsQuery();
    return (<>
        {isLoading ? (<Loader />) : err ?
            (<Message variant={"danger"}>{err?.data?.message || err.error}</Message>) : (
                <>
                    <Row>
                        {products.map((e, i) => <Product key={i} product={e} />)}
                    </Row>
                </>
            )}
    </>);
}

export default ProductList;