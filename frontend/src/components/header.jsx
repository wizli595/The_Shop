import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/lgoo.png';
const Header = () => {
    return (<>
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>
                        <img src={logo} alt="The-shop" className='shop-logo' />
                        The Shop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-nav' />
                    <Navbar.Collapse id='basic-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/cart'><FaShoppingCart /> Cart</Nav.Link>
                            <Nav.Link href='/login'><FaUser /> Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    </>);
}

export default Header;