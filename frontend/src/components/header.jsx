import logo from '@/assets/lgoo.png';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    return (<>
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>
                        <img src={logo} alt="The-shop" className='shop-logo' />
                        The Shop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-nav' />
                    <Navbar.Collapse id='basic-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link as={Link} to={'/cart'}>
                                <FaShoppingCart /> Cart
                                {cartItems.length > 0 && (<Badge pill style={{ marginLeft: "5px" }}>
                                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                                </Badge>)}
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item as={Link} to={"/profile"}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to={'/login'}>
                                    <FaUser /> Sign In
                                </Nav.Link>
                            )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >

    </>);
}

export default Header;