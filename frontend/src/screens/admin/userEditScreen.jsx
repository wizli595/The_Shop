import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/message';
import FormContainer from '../../components/formContainer';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../features/slices/usersApiSlice";

const UserEditScreen = () => {
    const { id: userId } = useParams();

    const navigate = useNavigate();

    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);


    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        isAdmin: false,
    });

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();


    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setUserInfo(prv => (
            type === "checkbox"
                ? { ...prv, [name]: checked }
                : { ...prv, [name]: value }
        ));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, ...userInfo }).unwrap();
            toast.success("User Updates Successfully");
            refetch();
            navigate("/admin/userlist");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };



    useEffect(() => {
        if (user) setUserInfo(prv => ({ ...prv, ...user }));
    }, [user]);

    return (
        <>
            <Link to={"/admin/userlist"} className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate && <Loader />}

                {
                    isLoading ? (<Loader />) :
                        error ? (<Message variant={"danger"}>{error?.data?.message || error.error}</Message>) :
                            (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name' className='my-2'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter new Name'
                                            name='name'
                                            value={userInfo.name}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='email' className='my-2'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter new Email'
                                            name='email'
                                            value={userInfo.email}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group className='my-2' controlId='isadmin'>
                                        <Form.Check
                                            type='checkbox'
                                            label='Is Admin'
                                            name='isAdmin'
                                            checked={userInfo.isAdmin}
                                            value={userInfo.isAdmin}
                                            onChange={changeHandler}
                                        ></Form.Check>
                                    </Form.Group>
                                    <Button type='submit' variant='primary' className='my-2'>Update</Button>
                                </Form>
                            )
                }
            </FormContainer >

        </>);
};

export default UserEditScreen;