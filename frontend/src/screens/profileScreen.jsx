import { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/message';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../features/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../features/slices/orderApiSlice';
import { setCredentials } from '../features/slices/authSlice';
import { FaTimes } from 'react-icons/fa';
const ProfileScreen = () => {
    const { userInfo } = useSelector(state => (state.auth));

    const [info, setInfo] = useState({
        name: userInfo.name || "",
        email: userInfo.email || "",
        password: "",
        confirmPassword: ""
    });
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInfo(prv => {
            return {
                ...prv,
                [name]: value
            };
        });
    };
    const dispatch = useDispatch();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();
    const [updateProfile, { isLoading: loadingUpdate }] = useProfileMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        if (info.password !== info.confirmPassword) return toast.error("password not match");
        try {
            const res = await updateProfile({
                name: info.name,
                email: info.email,
                password: info.password
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile been updated successfully");
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err?.error);
        }
    };
    return (<>
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            placeholder='Enter a new name'
                            value={info.name}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            name="email"
                            placeholder='Enter a new email'
                            value={info.email}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Enter a new password'
                            value={info.password}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2' controlId='confirmPassword'>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm your password'
                            value={info.confirmPassword}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                    {loadingUpdate && <Loader />}
                </Form>
            </Col>
            <Col md={9} >
                <h2 >My Orders</h2>
                {isLoading ? (<Loader />) :
                    error ? (<Message variant={"danger"}>{error?.data?.message || error?.error}</Message>) :
                        (
                            <Table striped hover responsive className='table-sm'>
                                <thead>
                                    <tr className='text-uppercase'>
                                        <th ><strong>id</strong></th>
                                        <th><strong>date</strong></th>
                                        <th><strong>total</strong></th>
                                        <th><strong>paid</strong></th>
                                        <th><strong>delivered</strong></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map(e => (
                                            <tr key={e._id}>
                                                <td>{e._id}</td>
                                                <td>{e.createdAt.substring(0, 10)}</td>
                                                <td>{e.totalPrice}</td>
                                                <td>
                                                    {e.isPaid ?
                                                        (e.paidAt.substring(0, 10)) :
                                                        (<FaTimes style={{ color: "red" }} />)
                                                    }
                                                </td>
                                                <td>
                                                    {e.isdelivered ?
                                                        (e.delivered.substring(0, 10)) :
                                                        (<FaTimes style={{ color: "red" }} />)
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={"/order/" + e._id}>
                                                        <Button className='btn-sm' variant='light' >
                                                            Details
                                                        </Button>
                                                    </Link>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )}

            </Col>
        </Row>
    </>);
};

export default ProfileScreen;