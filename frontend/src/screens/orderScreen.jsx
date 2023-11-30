import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../features/slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/message";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const {
        data: order,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    return isLoading ? (<Loader />) :
        error ? (<Message variant={"danger"}>{error.data.message}</Message>) :
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
                                    {
                                        order.isDelivered ?
                                            (<Message variant={"success"}>Delivered on {order.deliveredAt}</Message>)
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
                                            <Message variant={"success"}>Paid on {order.paidAt}</Message>
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
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            );
}

export default OrderScreen;