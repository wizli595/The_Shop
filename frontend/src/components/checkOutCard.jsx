import { Card, ListGroup, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
const CheckOutCard = ({ cartItems, check }) => {
    const { t } = useTranslation();
    return (<>
        <Card >
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>
                        {t('SubTotal')} ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
                        {t('items')}
                    </h2>
                    MAD{cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={check}
                    >
                        {t('Proceed To Checkout')}
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card></>);
};
CheckOutCard.propTypes = {
    cartItems: propTypes.array,
    check: propTypes.func
};
export default CheckOutCard;