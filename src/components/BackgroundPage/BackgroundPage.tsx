import "./BackgroundPage.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

export default function BackgroundPage(){
    return (
        <Container fluid className="main-container">
            <Row>
                <Col sm={12} md={6} className="p-4 welcome-section">
                    <div className="pt-2">
                        <h2>Interested in learning how the Network was created or how it works? Take a look!</h2>
                        <p className="mt-4 fs-5">To begin with, the Network was both trained and tested using the <a href="https://ai.stanford.edu/~jkrause/cars/car_dataset.html" target="_blank" rel="noreferrer">Stanford Car Dataset</a>
                            , which contains around <b>16K</b>! images of cars and their corresponding model names (See example <span> on the right side</span>).</p>
                    </div>
                </Col>

                <Col sm={12} md={6} className="p-4">
                    <div className="text-center">
                        <h2>Example of Image</h2>
                        <img src={require("../../assets/images/demo-img-3.jpg")} width={140}/>

                    </div>
                    <div className="test">
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                        <p>das</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}