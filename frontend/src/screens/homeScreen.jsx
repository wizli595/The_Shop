import ProductList from "@/components/productList";
import Loader from '../components/Loader';
import Message from '../components/message';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/slices/productsApiSlice';
import Paginate from "../components/paginate";
import ProductCarousel from "../components/productCarousel";
import Meta from "../components/meta";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
    const { pageNumber, keyword, category } = useParams();

    const { t } = useTranslation();

    const { data, isLoading, err } = useGetProductsQuery({ keyword, pageNumber, category });
    return (<>
        {!keyword && !category ? (<ProductCarousel />) : <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>}
        <Meta title={t("store")} />
        <h1>{t('Latest Products')}</h1>
        {isLoading ? (<Loader />) : err ?
            (<Message variant={"danger"}>{err?.data?.message || err.error}</Message>) : (
                <>
                    <ProductList products={data.products} />
                    <div className="d-flex justify-content-center align-items-center">
                        <Paginate page={data.page} pages={data.pages} keyword={keyword} category={category} />
                    </div>
                </>
            )
        }

    </>);
};

export default HomeScreen;