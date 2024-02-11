import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/message";
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useDeliverOrderMutation } from "../features/slices/orderApiSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WhatsappBtn from "../components/whatsappBtn";

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPaypal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        console.log(order.orderItems.details)
        if (!errorPaypal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: "pending" });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [errorPaypal, loadingPayPal, paypal, order, paypalDispatch]);
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success("Order is Paid");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        });
    };
    // ///////////
    // FOR TEST ONLY
    // 
    // const onApproveTest = async () => {
    //     await payOrder({ orderId, details: { payer: {} } });
    //     refetch();
    //     toast.success("Order is Paid")
    // }
    // ///////////
    const payHandler = async () => {
        const details = userInfo
        try {
            await payOrder({ orderId, details });
            refetch();
            toast.success("Order is Paid");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    const onError = (err) => {
        toast.error(err.message);
    };
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{ amount: { value: order.totalPrice } }]
        }).then((orderID) => (orderID));
    };
    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success("Order deliverd ");
        } catch (err) {
            toast.error(err?.data?.message || err.error);

        }
    };
    return isLoading ? (<Loader />) :
        error ? (<Message variant={"danger"}>{error?.data?.message}</Message>) :
            (
                <>
                    <h1>Order {orderId}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>shipping</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address + " " + order.shippingAddress.city + " " + order.shippingAddress.country}
                                    </p>
                                    {order.orderItems.details && <p>
                                        <strong>detailes </strong>
                                        {order.orderItems.details}
                                    </p>}
                                    {
                                        order.isDelivered ?
                                            (<Message variant={"success"}>Delivered on {order.deliveredAt.substring(0, 10)}</Message>)
                                            : (<Message variant={"danger"}>Not Delivered</Message>)
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {
                                        order.isPaid ? (
                                            <Message variant={"success"}>Paid on {order.paidAt.substring(0, 10)}</Message>
                                        ) : (
                                            <Message variant={"danger"}>Not Paid</Message>
                                        )
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {
                                        order.orderItems.length === 0 ?
                                            (
                                                <Message>Order is empty</Message>
                                            ) :
                                            (
                                                <ListGroup variant="flush">
                                                    {order.orderItems.map((item, i) => (
                                                        <ListGroup.Item key={i}>
                                                            <Row>
                                                                <Col md={1}>
                                                                    <Image
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        fluid
                                                                        rounded
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <Link to={"/product/" + item.product}>{item.name}</Link>
                                                                </Col>
                                                                <Col md={4}>
                                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total Price</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!userInfo.isAdmin ?
                                        !order.isPaid ?
                                            order.paymentMethod === "whatsapp"
                                                ? (
                                                    <WhatsappBtn />
                                                ) :
                                                (
                                                    <ListGroup.Item>
                                                        {loadingPay && <Loader />}
                                                        {isPending ? (<Loader />) : (
                                                            <div>
                                                                {/* TEST ONLY */}
                                                                {/* <Button
                                                            style={{ marginBottom: '10px' }}
                                                            onClick={onApproveTest}
                                                        >
                                                            Test Pay Order
                                                        </Button> */}

                                                                <div>
                                                                    <PayPalButtons
                                                                        createOrder={createOrder}
                                                                        onApprove={onApprove}
                                                                        onError={onError}
                                                                    ></PayPalButtons>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </ListGroup.Item>
                                                ) : "" : ""
                                    }
                                    {loadingPay && <Loader />}
                                    {
                                        userInfo && userInfo.isAdmin && order.paymentMethod === "whatsapp"
                                        && !order.isDelivered && !order.isPaid &&
                                        (
                                            <ListGroup.Item>
                                                <Button
                                                    type="button"
                                                    className="btn btn-block"
                                                    onClick={payHandler}
                                                >
                                                    Mark As Pay
                                                </Button>
                                            </ListGroup.Item>
                                        )
                                    }

                                    {loadingDeliver && <Loader />}
                                    {
                                        userInfo && userInfo.isAdmin && order.isPaid
                                        && !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type="button"
                                                    className="btn btn-block"
                                                    onClick={deliverHandler}
                                                >
                                                    Mark As Delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            );
};

export default OrderScreen;