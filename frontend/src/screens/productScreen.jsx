import { Card, Col, Image, ListGroup, Row, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from '@/components/rating';
import { useGetProductDetailsQuery } from '../features/slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/slices/cartSlice';
import { useState } from 'react';
const ProductScreen = () => {
    const { id: productID } = useParams();
    const [qty, setQty] = useState(1)
    const { data: SingleProd, isLoading, err } = useGetProductDetailsQuery(productID)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addToCartHandler = () => {
        dispatch(addToCart({ ...SingleProd, qty }));
        navigate('/cart');
    }
    return (<>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {isLoading ?
            (<Loader />) : err ?
                (<Message variant={"danger"}>{err?.data?.message || err.error}</Message>) : (<>
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
                                    {SingleProd.countInStock > 0 &&
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as={"select"}
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                    >
                                                        {[...Array(SingleProd.countInStock).keys()].map(x => (
                                                            <option key={x} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    }
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            onClick={addToCartHandler}
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