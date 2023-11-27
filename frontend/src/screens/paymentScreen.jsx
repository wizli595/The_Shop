import { useEffect, useState } from "react";
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer';
import CheckoutSteps from "../components/checkOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../features/slices/cartSlice";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const { shippingAdress } = useSelector((state) => state.cart)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder")
    }

    useEffect(() => {
        if (!shippingAdress.address) {
            navigate('/shipping')
        }
    }, [shippingAdress, navigate])

    return (
        <FormContainer>
            <CheckoutSteps currentStep={3} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as={'legend'}>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            className="my-2"
                            type="radio"
                            label="PayPal"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;