import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import TableHead from '../../components/tableHead';
import { useGetOrdersQuery } from '../../features/slices/orderApiSlice';
import { FaTimes } from 'react-icons/fa';
const OrderListScreen = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (<>
        <h1>All Orders</h1>
        {
            isLoading ? (<Loader />) : error ?
                <Message variant={"danger"}>{error?.data?.message}</Message> :
                (<Table striped hover responsive className='table-sm'>
                    <TableHead />
                    <tbody>
                        {
                            orders.map(e => (
                                <tr key={e._id}>
                                    <td>{e._id}</td>
                                    <td>{e.createdAt.substring(0, 10)}</td>
                                    <td>{e.totalPrice}</td>
                                    <td>
                                        {e.isPaid ? (e.paidAt.substring(0, 10)) : (<FaTimes style={{ color: "red" }} />)}
                                    </td>
                                    <td>
                                        {e.isDelivered ? (e.deliveredAt.substring(0, 10)) : (<FaTimes style={{ color: "red" }} />)}
                                    </td>
                                    <td>
                                        <Button
                                            className='btn-sm text-capitalize'
                                            as={Link}
                                            to={"/order/" + e._id}
                                            variant='light'
                                        >detailes</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>)
        }

    </>);
};

export default OrderListScreen;