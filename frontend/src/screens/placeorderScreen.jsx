import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import CheckOutSteps from '../components/checkOutSteps';
import Message from '../components/message';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCreateOrderMutation } from '../features/slices/orderApiSlice';
import { clearCartItems } from '../features/slices/cartSlice';
const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems,
        shippingAdress: shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice }
        = useSelector(state => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const placeOredrHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod
            }).unwrap();
            dispatch(clearCartItems());
            navigate("/order/" + res._id);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [shippingAddress, navigate, paymentMethod]);
    return (
        <>
            <CheckOutSteps currentStep={4} />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address},
                                {
                                    shippingAddress.city +
                                    " "
                                    + shippingAddress.country
                                }
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Orders Items</h2>
                            {
                                cartItems.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {
                                            cartItems.map((item, i) => (
                                                <ListGroup.Item key={i}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link to={"/product/" + item._id}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price}=$
                                                            {(item.qty * (item.price * 100)) / 100}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush' >
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (<Message variant={"danger"}>{error?.data?.message || error.message}</Message>)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={placeOredrHandler}
                                >
                                    Place Order
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;