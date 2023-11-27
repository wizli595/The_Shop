import { Nav } from 'react-bootstrap';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
const steps = ['LogIn', 'Shipping', 'Payment', 'PlaceOrder'];

const CheckoutSteps = ({ currentStep }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            {steps.map((step, index) => (
                <Nav.Item key={index}>
                    {index < currentStep ? (
                        <Nav.Link as={Link} to={`/${step.toLowerCase()}`}>
                            {step}
                        </Nav.Link>
                    ) : (
                        <Nav.Link disabled>{step}</Nav.Link>
                    )}
                </Nav.Item>
            ))}
        </Nav>
    );
};
CheckoutSteps.propTypes = {
    currentStep: propTypes.number
}
export default CheckoutSteps;