import { Nav } from 'react-bootstrap';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ currentStep, includeOnOrder = false }) => {

    let steps = ['LogIn', 'Shipping', 'Payment'];


    if (includeOnOrder) {
        steps.push('OnOrder');
    } else {
        steps.push('PlaceOrder');
    }

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
    currentStep: propTypes.number.isRequired,
    includeOnOrder: propTypes.bool,
};

export default CheckoutSteps;
