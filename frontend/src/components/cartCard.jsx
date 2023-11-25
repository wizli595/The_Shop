import { ListGroup, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
const CartCard = ({ item, add, remove }) => {
    return (<ListGroup.Item >
        <Row>
            <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
                <Link to={"/product/" + item._id}>{item.name} </Link>
            </Col>
            <Col md={2}>${item.price}</Col>
            <Col md={2}>
                <Form.Control
                    as={"select"}
                    value={item.qty}
                    onChange={(e) => { add(item, Number(e.target.value)) }}
                >
                    {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x} value={x + 1}>{x + 1}</option>
                    ))}
                </Form.Control>
            </Col>
            <Col md={2}>
                <Button
                    type='button'
                    variant='light'
                    onClick={() => remove(item._id)}>
                    <FaTrash />
                </Button>
            </Col>
        </Row>
    </ListGroup.Item>);
}
CartCard.propTypes = {
    item: propTypes.object,
    add: propTypes.func,
    remove: propTypes.func,
}
export default CartCard;