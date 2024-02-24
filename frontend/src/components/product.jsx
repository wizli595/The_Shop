import { Col, Card } from 'react-bootstrap';
import propTypes from 'prop-types';
import Rating from './rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (<>
        <Col sm={12} md={6} lg={4} xl={3} >
            <Card className='my-3 p-3 rounded ' >
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />
                </Link>

                <Card.Body >
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as={"div"} className='product-title'>
                            <strong>
                                {product.name}
                            </strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as={'div'} className='rating'>
                        <Rating stars={product.rating} text={product.numReviews} />
                    </Card.Text>
                    <Card.Text as={'h3'}>MAD{product.price} </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </>);
}
Product.propTypes = {
    product: propTypes.object,
}
export default Product;