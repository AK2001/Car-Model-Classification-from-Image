import './MainContent.css';
import React, {BaseSyntheticEvent, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function MainContent() {

    const [imageData, setImageData] = useState({
        imageURL: "",
        image: null,
    });

    const[results, setResults] = useState({
        predictedModel: "",
        accuracy: -1,
    })

    const [isInputClear, setIsInputClear] = useState(true);

    const imageInputRef = useRef<HTMLInputElement>(null)

    const imageHandler = (event: BaseSyntheticEvent) => {
        if (event.target.files.length !== 0) {
            setImageData({
                imageURL: URL.createObjectURL(event.target.files[0]),
                image: event.target.files[0],
            })

            setResults({
                predictedModel: "",
                accuracy: -1,
            })

            if (isInputClear) {
                setIsInputClear(!isInputClear)
            }
        }
    };

    const clearImage = () => {
        setIsInputClear(true)
        setImageData({
            imageURL: "",
            image: null,
        })
        // @ts-ignore
        imageInputRef.current.value = "";
    }

    const showResults = () => {

        // const data = {image: formData, imageUrl: imageData.imageURL}
        axios.post("/image")
            .then(res =>{
                // setResults({
                // predictedModel: res.data.prediction,
                // accuracy: res.data.accuracyy,
                console.log(res)
            }).catch(err => {
                console.log(err)
        })
    }

    return (
        <Container fluid className="main-container min-vh-100">
            <Row>
                <Col className="m-5">
                    <section>
                        <div className="welcome-section">
                            <h1>Car model classification using</h1>
                            <h1>Convolutional Neural Networks.</h1>
                            <h3 className="mt-4">This is a project made by <a href='/#'>Alexandros Kelaiditis</a> as part of his
                                dissertation</h3>
                            <div className="interested-link">
                                <p>Interested in learning how it works? <a href="/#">Click here</a>.</p>
                            </div>
                        </div>
                    </section>
                </Col>

                <Col className="m-5">
                    <section>
                        <div className="model-section w-100">
                            <h1 id="heading">Try it out!</h1>
                            <div className="d-block w-100 file-input-section">
                                <div className="file-input-area"> {/*was form*/}
                                    <span className="file-msg">Click or drag & drop your image here.</span>
                                    <input className="file-input" type="file" accept="image/*"
                                           onChange={imageHandler} ref={imageInputRef} />
                                </div>
                                <button className="file-btn" onClick={clearImage}>Cancel</button>
                            </div>
                            <div className="image-container">
                                {isInputClear ?
                                    (<img src={require("../../assets/images/no-image.png")} alt="no-image uploaded" width={280} height={280}/>)
                                    :
                                    (<img src={imageData.imageURL} alt="user-uploaded image" width={300} height={300}/>)
                                }
                            </div>
                            {isInputClear  ?
                                (<div></div>)
                                :
                                (<div className="d-inline-flex w-100 upload-image">
                                    <Button variant="dark" onClick={showResults}>Test Image</Button>
                                    {results.predictedModel ?
                                        (<div className="results-container">
                                            <h5>Results:</h5>
                                            <p>Predicted Model = {results.predictedModel}</p>
                                            <p>Accuracy = {results.accuracy}%</p>
                                        </div>)
                                    :
                                        (<div></div>)}
                                </div>)
                            }
                        </div>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}