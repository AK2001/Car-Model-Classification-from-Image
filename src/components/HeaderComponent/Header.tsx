import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type MenuProps = {
    title?: string;
}

export default function Header({title = "About"}: MenuProps) {
    return (
        <Navbar className="nav-menu fs-5 py-sm-3" collapseOnSelect expand="sm" fixed="top" variant="light">
            <Container fluid>
                <Navbar.Brand id="nav-brand" href="/"><strong>Car model classification</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/*Nav links*/}
                    <Nav className="me-auto">
                        <Nav.Link id="nav-link" href="#background">Background</Nav.Link>
                        <Nav.Link id="nav-link" href="#about">{title}</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
