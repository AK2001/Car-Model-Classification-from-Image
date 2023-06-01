import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkToGithub from "../LinkToGithubButton/LinkToGithub";
import React, {useState} from "react";

export default function Header() {

    // State that stores boolean value of whether navbar is collapsed
    const [collapsed, setCollapsed] = useState(true);

    // Changes collapsed state
    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Navbar className="nav-menu fs-5 py-sm-3" collapseOnSelect expand="sm" fixed="top" variant="light">
            <Container fluid>
                <Navbar.Brand id="nav-brand" href="/"><strong>Car model classification</strong></Navbar.Brand>
                <Navbar.Toggle
                    onClick={handleToggle}
                    aria-controls="basic-navbar-nav">

                    <div className={collapsed ? 'toggle-icon collapsed' : 'toggle-icon'}>
                        <div className="l1"></div>
                        <div className="l2"></div>
                        <div className="l3"></div>
                    </div>

                </Navbar.Toggle>

                <Navbar.Collapse id="responsive-navbar-nav">
                    {/*Nav links*/}
                    <Nav className="me-auto ">
                        <Nav.Link id="nav-link" href="/background">Background</Nav.Link>
                    </Nav>

                    <Nav className="d-inline-block">
                        <span id="check-github-msg">Check out my Github! &#x27A1;</span>
                        <Nav.Link id="github-link" href="https://github.com/AK2001/Car-Model-Classification-from-Image" target="_blank" rel="noreferrer">
                            <LinkToGithub/>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
