import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../features/slices/authSlice';
import { useLoginMutation, useLoginWithFacebookMutation } from '../features/slices/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import FacebookLogin from 'react-facebook-login';
const LoginScreen = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation()

    const [loginWithFacebook, { isLoading: facebookLoading }] = useLoginWithFacebookMutation();

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()

    const sp = new URLSearchParams(search)

    const redirect = sp.get('redirect') || "/"
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login(loginInfo).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target
        setLoginInfo(prv => {
            return {
                ...prv,
                [name]: value
            }
        })
    }

    const responseFacebook = async (response) => {
        console.log(response)
        // Handle the Facebook response here, e.g., send it to the server for authentication
        try {
            const res = await loginWithFacebook(response).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            // Handle error
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email...'
                        name='email'
                        value={loginInfo.email}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password...'
                        name='password'
                        value={loginInfo.password}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
                    Sign In
                </Button>

                {isLoading && <Loader />}
                <div className='text-center my-4'>
                    <hr className='border-dark' />
                    <span className=' text-muted'>Or</span>
                    <hr className='border-dark' />
                </div>
                <div className='text-center'>
                    <FacebookLogin
                        appId="363029113122304"
                        autoLoad={false}
                        fields="name,email"
                        callback={responseFacebook}

                    />
                </div>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={"/register"}>Register</Link>
                </Col>
            </Row>

        </FormContainer>
    );
}

export default LoginScreen;