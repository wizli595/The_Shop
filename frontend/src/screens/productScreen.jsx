import { Card, Col, Image, ListGroup, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from '@/components/rating';
import { useCreateProductReviewMutation, useGetProductDetailsQuery } from '../features/slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/message';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/slices/cartSlice';
import { useState } from 'react';
import Meta from '../components/meta';

const ProductScreen = () => {

    const { id: productID } = useParams();

    const [qty, setQty] = useState(1);

    const [review, setReview] = useState({
        comment: "",
        rating: ""
    });

    const ratingList = ["poor", "fair", "good", "very good", "exellent"];

    const [createReview, { isLoading: loadingReview }] = useCreateProductReviewMutation();

    const { data: SingleProd, isLoading, error: err, refetch } = useGetProductDetailsQuery(productID);

    const { userInfo } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...SingleProd, qty }));
        navigate('/cart');
    };
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setReview(prv => ({ ...prv, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({ id: productID, ...review }).unwrap();
            refetch();
            toast.success("Review been submited");
        } catch (errr) {
            toast.error(errr?.data?.message || errr.error);
        }
    };

    return (<>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {isLoading ?
            (<Loader />) : err ?
                (<Message variant={"danger"}>{err?.data?.message || err.error}</Message>) : (<>
                    <Row>
                        <Meta title={SingleProd.name} />
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
                    <Row className='review'>
                        <Col md={6}>
                            {SingleProd.reviews.length === 0 && <Message>No Reviews yet</Message>}
                            <ListGroup variant='flush'>
                                <h1>All Reviews</h1>
                                {
                                    SingleProd.reviews.map((e) => (
                                        <ListGroup.Item key={e._id}>
                                            <strong>{e.name}</strong>
                                            <p>{e.comment}</p>
                                            <p>{e.rating}</p>
                                        </ListGroup.Item>
                                    )
                                    )
                                }
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {loadingReview && <Loader />}
                                    {
                                        userInfo ? (<>
                                            <Form onSubmit={submitHandler}>
                                                <FormGroup>
                                                    <Form.Control
                                                        as={"select"}
                                                        value={review.rating}
                                                        name='rating'
                                                        onChange={changeHandler}
                                                    >
                                                        <option value="">select your rating</option>
                                                        {ratingList.map((e, i) => (<option key={i} value={i + 1}>{e}</option>))}
                                                    </Form.Control>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Form.Label>comment</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        as={"textarea"}
                                                        placeholder='Enter a Comment'
                                                        name='comment'
                                                        value={review.comment}
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                                <Button
                                                    type='submit'
                                                    disabled={loadingReview}
                                                >comment</Button>
                                            </Form>
                                        </>)
                                            :
                                            (<Message>Login befor u can write</Message>)
                                    }
                                </ListGroup.Item>


                            </ListGroup>

                        </Col>

                    </Row>
                </>)}
    </>);
};

export default ProductScreen;