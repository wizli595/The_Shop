import { Card, Col, Image, ListGroup, Row, Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import Rating from '@/components/rating';
import { useGetProductDetailsQuery } from '../features/slices/productsApiSlice';
const ProductScreen = () => {
    const { id: productID } = useParams();
    const { data: SingleProd, isLoading, err } = useGetProductDetailsQuery(productID)
    return (<>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {isLoading ?
            (<div>isLoading</div>) : err ?
                (<div>errorr</div>) : (<>
                    <Row>
                        <Col md={5}>
                            <Image src={SingleProd.image} alt={SingleProd.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{SingleProd.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating stars={SingleProd.rating} text={SingleProd.numReviews} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {SingleProd.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>${SingleProd.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            {SingleProd.countInStock > 0 ?
                                                <Col className='text-success'>In Stock</Col> :
                                                <Col className='text-danger'>Out Of Stock</Col>}
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={SingleProd.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>)}

    </>);
}

export default ProductScreen;