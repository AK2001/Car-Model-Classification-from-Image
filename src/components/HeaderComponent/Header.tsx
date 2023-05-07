import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkToGithub from "../LinkToGithubButton/LinkToGithub";
import React, {useState} from "react";

type MenuProps = {
    title?: string;
}

export default function Header({title = "About"}: MenuProps) {

    const [collapsed, setCollapsed] = useState(true);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Navbar className="nav-menu fs-5 py-sm-3" collapseOnSelect expand="sm" fixed="top" variant="light">
            <Container fluid>
                <Navbar.Brand id="nav-brand" href="/"><strong>Car model classification</strong></Navbar.Brand>
                <Navbar.Toggle
                    onClick={handleToggle}
                    className={collapsed ? 'collapsed' : ''}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/*Nav links*/}
                    <Nav className="me-auto ">
                        <Nav.Link id="nav-link" href="/background">Background</Nav.Link>
                        <Nav.Link id="nav-link" href="#about">{title}</Nav.Link>
                    </Nav>

                    <Nav className="d-inline-block">
                        <span id="check-github-msg">Check my Github! &#x27A1;</span>
                        <Nav.Link id="github-link" href="https://github.com/AK2001/Car-Model-Classification-from-Image" target="_blank" rel="noreferrer">
                            <LinkToGithub/>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
