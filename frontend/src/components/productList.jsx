import { Row } from 'react-bootstrap';
// import axios from 'axios';
import Product from './product';
// import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '@/features/slices/productsApiSlice';
const ProductList = () => {
    const { data: products, isLoading, err } = useGetProductsQuery();
    return (<>
        {isLoading ? (<div>is Loading...</div>) : err ? (<div>error</div>) : (
            <>

                <Row>
                    {products.map((e, i) => <Product key={i} product={e} />)}
                </Row>
            </>
        )}
    </>);
}

export default ProductList;