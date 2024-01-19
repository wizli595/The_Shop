import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { setCredentials } from '../features/slices/authSlice';
import { useRegisterMutation } from '../features/slices/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
const RegisterScreen = () => {
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()
    // const dispatch = useDispatch();
    const navigate = useNavigate()

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || "/"
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])
    const changeHandler = (e) => {
        const { name, value } = e.target
        setRegisterInfo(prv => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = registerInfo
        if (confirmPassword !== password) {
            toast.error("check the password")
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                console.log(res)
                toast.success('User registered successfully. Please check your email for verification.');
                // Redirect to the email verification screen
                navigate(`/login`);
                // dispatch(setCredentials({ ...res }));
                // navigate("/");
            } catch (err) {
                console.log(err)
                toast.error(err?.data?.message || err.error);
            }
        }

    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Full name...'
                        name='name'
                        value={registerInfo.name}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email...'
                        name='email'
                        value={registerInfo.email}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password...'
                        name='password'
                        value={registerInfo.password}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Reenter Password...'
                        name='confirmPassword'
                        value={registerInfo.confirmPassword}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
                    Sign Up
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an Account? <Link to={"/login"}>Log In</Link>
                </Col>
            </Row>

        </FormContainer>);
}

export default RegisterScreen;