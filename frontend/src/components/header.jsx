import logo from '@/assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/slices/usersApiSlice';
import { logout } from '../features/slices/authSlice';
import { resetCart } from '../features/slices/cartSlice';
import SearchBox from './searchBox';
import LanguageSwitcher from './LanguageSwitcher';
const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const { t } = useTranslation()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };
    return (<>
        <header className='color'>
            <Navbar variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>
                        <img src={logo} alt="The-shop" className='shop-logo' />

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-nav' />
                    <Navbar.Collapse id='basic-nav'>
                        <Nav className='ms-auto' >
                            <SearchBox />
                            <Nav.Link as={Link} to={'/cart'}>
                                <FaShoppingCart /> {t('cart')}
                                {cartItems.length > 0 && (<Badge pill style={{ marginLeft: "5px" }}>
                                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                                </Badge>)}
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item as={Link} to={"/profile"}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to={'/login'}>
                                    <FaUser /> Sign In
                                </Nav.Link>
                            )
                            }
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title={userInfo.name + " menu"} id="admin">
                                    <NavDropdown.Item as={Link} to={"/admin/orderlist"}>Orders</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/admin/userlist"}>Users</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/admin/productlist"}>Products</NavDropdown.Item>
                                </NavDropdown>
                            )}
                            <LanguageSwitcher />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >

    </>);
};

export default Header;