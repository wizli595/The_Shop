import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { useCreateOrderMutation } from "../features/slices/orderApiSlice";
import { useGetProductDetailsQuery } from '../features/slices/productsApiSlice';
const OnOrderScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const { data: product, isLoading: isLoadingProduct, error: productError } = useGetProductDetailsQuery(productId);
    const [orderDetails, setOrderDetails] = useState({
        orderItems: [
            {
                _id: productId,
                qty: 1,
                details: '',
            },
        ],
        shippingAddress: {
            address: '',
            city: 'safi',
            postalCode: '0000',
            country: 'maroc',
        },
        paymentMethod: 'whatsapp',
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;

        if (name in orderDetails.shippingAddress) {
            setOrderDetails({
                ...orderDetails,
                shippingAddress: {
                    ...orderDetails.shippingAddress,
                    [name]: value,
                },
            });
        } else {
            setOrderDetails({
                ...orderDetails,
                [name]: value,
            });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await createOrder(orderDetails).unwrap();
            toast.success("Order placed successfully");
            navigate("/order/" + response._id);
        } catch (error) {
            console.log(error?.data?.message || error.message)
            toast.error("Failed to place order: ");
        }
    };

    useEffect(() => {

        if (!productId || productError) {
            toast.error(productError?.data?.message || "Product not found");
            navigate("/");
            return;
        }


        if (product) {
            console.log(product)
            setOrderDetails(prevDetails => ({
                ...prevDetails,
                orderItems: [
                    {
                        _id: productId,
                        qty: 1,
                        name: product.name,
                        image: product.image,


                    }
                ]
            }));
        }
    }, [productId, product, productError, navigate]);

    return (
        <FormContainer>
            <h1>Submit On Order Details</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter product name'
                        name='name'
                        value={orderDetails.name}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId='details' className='my-2'>
                    <Form.Label>Order Details</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Enter order details'
                        name='details'
                        value={orderDetails.details}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        name="address"
                        value={orderDetails.shippingAddress.address}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId='arrivalDate' className='my-2'>
                    <Form.Label>Expected Arrival Date</Form.Label>
                    <Form.Control
                        type='date'
                        name='arrivalDate'
                        value={orderDetails.arrivalDate}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={isLoading}>
                    Submit Order
                </Button>
            </Form>
        </FormContainer>
    );
};

export default OnOrderScreen;
