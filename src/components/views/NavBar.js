import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return(
        <Navbar bg="primary" variant="dark" className="rounded">
            <Container>
                <Navbar.Brand href="/">Waiter.app</Navbar.Brand>
                <Nav className="me-auto" className="d-flex">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;