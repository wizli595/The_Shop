import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/message';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/slices/cartSlice';
import CartCard from '../components/cartCard';
import CheckOutCard from '../components/checkOutCard';
const CartScreen = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkOutHandler = () => {
        navigate("/login?redirect=/shipping")
    }
    return (<>
        <Row>
            <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
            <Col md={8}>
                {cartItems.length === 0 ? (<Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                </Message>) :
                    (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (
                                    <CartCard
                                        key={item._id}
                                        item={item}
                                        add={addToCartHandler}
                                        remove={removeFromCartHandler} />
                                ))
                            }
                        </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <CheckOutCard cartItems={cartItems} check={checkOutHandler} />
            </Col>
        </Row>

    </>);
}

export default CartScreen;