import ProductList from "@/components/productList";
import Loader from '../components/Loader';
import Message from '../components/message';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/slices/productsApiSlice';
import Paginate from "../components/paginate";

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams()
    const { data, isLoading, err } = useGetProductsQuery({ keyword, pageNumber });
    return (<>
        {keyword && <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>}
        <h1>Latest Products</h1>
        {isLoading ? (<Loader />) : err ?
            (<Message variant={"danger"}>{err?.data?.message || err.error}</Message>) : (
                <>
                    <ProductList products={data.products} />
                    <div className="d-flex justify-content-center align-items-center">
                        <Paginate page={data.page} pages={data.pages} keyword={keyword ? keyword : ""} />
                    </div>
                </>
            )
        }

    </>);
}

export default HomeScreen;