import { Form, Button } from 'react-bootstrap';
import FormContainer from '@/components/formContainer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../features/slices/cartSlice';
const ShippingScreen = () => {
    const { shippingAdress } = useSelector((state) => state.cart)
    const [shippingInfo, setShippingInfo] = useState(shippingAdress || {
        address: "",
        city: "",
        postalCode: "",
        country: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const changeHandler = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(shippingInfo));
        navigate("/payment")
    }
    return (
        <FormContainer>
            <h1>Shipping </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        name='address'
                        placeholder='enter Address...'
                        value={shippingInfo.address}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        name='city'
                        placeholder='enter City...'
                        value={shippingInfo.city}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='number'
                        name='postalCode'
                        placeholder='enter Postal Code...'
                        value={shippingInfo.postalCode}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        name='country'
                        placeholder='enter Country...'
                        value={shippingInfo.country}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;