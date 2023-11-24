import { Row } from 'react-bootstrap';
// import axios from 'axios';
import Product from './product';
// import { useEffect, useState } from 'react';
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