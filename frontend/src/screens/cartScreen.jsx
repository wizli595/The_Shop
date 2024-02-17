import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/message';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/slices/cartSlice';
import CartCard from '../components/cartCard';
import CheckOutCard from '../components/checkOutCard';
import Meta from '../components/meta';
import { useTranslation } from 'react-i18next';
const CartScreen = () => {
    const { cartItems } = useSelector((state) => state.cart);

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkOutHandler = () => {
        navigate("/login?redirect=/shipping");
    };
    return (<>
        <Row>
            <Meta title={t("cart")} />
            <h1 style={{ marginBottom: '20px' }}>{t('Shopping Cart')}</h1>
            <Col md={8}>
                {cartItems.length === 0 ? (<Message>
                    {t('Your cart is empty')} <Link to="/">{t('Go Back')}</Link>
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
};

export default CartScreen;