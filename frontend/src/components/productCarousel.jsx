import { useGetTopProductsQuery } from "../features/slices/productsApiSlice";
import { Carousel, Image } from 'react-bootstrap';
import Loader from "./Loader";
import Message from "./message";
import { Link } from "react-router-dom";
const ProductCarousel = () => {
    const { data, isLoading, error } = useGetTopProductsQuery()
    return isLoading ? (<Loader />) : error ? (<Message variant={"danger"} >{error?.data?.message || error?.message}</Message>) :
        (<Carousel pause='hover' className="bg-primary mb-4 " >
            {data.map(p => (
                <Carousel.Item key={p._id} as={Link} to={`/product/${p._id}`}>
                    <Image src={p.image} alt={p.name} fluid className="w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                    <Carousel.Caption>
                        <h2>
                            {p.name} (MAD {p.price})
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}

        </Carousel>);
}

export default ProductCarousel;