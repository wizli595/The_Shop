import { Col, Card } from 'react-bootstrap';
import propTypes from 'prop-types';

const Product = ({ product }) => {
    return (<>
        <Col sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
                <a href={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />
                </a>
                <Card.Body>
                    <a href={`/product/${product._id}`}>
                        <Card.Title as={"div"}>
                            <strong>
                                {product.name}
                            </strong>
                        </Card.Title>
                    </a>
                    <Card.Text as={'h3'}>${product.price} </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </>);
}
Product.propTypes = {
    product: propTypes.object,
}
export default Product;