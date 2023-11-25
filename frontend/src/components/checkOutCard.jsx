import { Card, ListGroup, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
const CheckOutCard = ({ cartItems }) => {
    return (<>
        <Card >
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>
                        SubTotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
                        items
                    </h2>
                    ${cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                    >
                        Proceed To Checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card></>);
}
CheckOutCard.propTypes = {
    cartItems: propTypes.array
}
export default CheckOutCard;