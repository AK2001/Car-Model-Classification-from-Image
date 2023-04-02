import './MainContent.css';
import React, {BaseSyntheticEvent, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import axios from "axios";

export default function MainContent() {

    // State for image data
    const [imageData, setImageData] = useState({
        imageURL: "",
        image: null,
    });

    // State for result data
    const[results, setResults] = useState({
        predictedModel: "",
        accuracy: -1,
        top3Predictions: []
    })

    // State to know whether input is true or false. True=user has clicked on "cancel"
    const [isInputClear, setIsInputClear] = useState(true);

    const imageInputRef = useRef<HTMLInputElement>(null)

    // Activates each time user selects an image in the input
    const imageHandler = (event: BaseSyntheticEvent) => {
        // If the input is not empty (check its files)
        if (event.target.files.length !== 0) {

            // Save image data, a URL and the actual object
            setImageData({
                imageURL: URL.createObjectURL(event.target.files[0]),
                image: event.target.files[0],
            })

            // Each time a different image is selected, results are changed to "default" values
            setResults({
                predictedModel: "",
                accuracy: -1,
                top3Predictions: [],
            })

            // Change the input
            if (isInputClear) {
                setIsInputClear(!isInputClear)
            }

            // Display the "test" button
            if (document.getElementById("test-btn") != null){
                // @ts-ignore
                document.getElementById("test-btn").style.display = "inline";
            }

        }
    };

    // Clears image after user selects "cancel" btn
    const clearImage = () => {
        setIsInputClear(true)
        setImageData({
            imageURL: "",
            image: null,
        })

        imageInputRef.current!.value = "";
    }

    // State to store loading component status
    const [isLoading, setIsLoading] = useState(false);

    // Shows results to the user-makes POST request to the backend
    async function showResults() {

        document.getElementById("test-btn")!.style.display = "none"; // Make "test" btn invisible
        document.getElementById('cancelBtn')!.setAttribute("disabled","disabled"); // Disable "cancel" btn

        setIsLoading(true); // Show loading spinner

        // Data (image) for Backend
        const data = {"file": imageData.image}

        // Post request
        await axios.post("/API/userImage", data, {headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}})
            .then(res =>{
                setResults({
                    predictedModel: res.data.modelPrediction,
                    accuracy: res.data.modelAccuracy,
                    top3Predictions: res.data.top3Predictions,})
                setIsLoading(false) // Hide loading spinner
                document.getElementById('cancelBtn')!.removeAttribute("disabled"); // Enable "cancel" btn
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
                document.getElementById('cancelBtn')!.removeAttribute("disabled");
        })
    }

    return (
        <Container fluid className="main-container min-vh-100">
            <Row>
                <Col sm={12} md={6} className="p-4">
                    <section>
                        <div className="welcome-section">
                            <h1>Car model classification using</h1>
                            <h1>Convolutional Neural Networks.</h1>
                            <div className="project-intro pt-sm-4">
                                <h3 className="mt-4">A project made by <a href='/#'>Alexandros Kelaiditis</a> as part of his
                                    dissertation in Computer Science.</h3>
                                <p>Interested in learning how it works? <a href="/#">Click here</a>.</p>

                                <p className="mt-4 fs-5"> To get started simply <b>upload</b> an image of a car, <b>click</b> the button that will appear and wait
                                    as the model tries to find the model of your Car.</p>
                            </div>
                        </div>
                    </section>
                </Col>

                <Col sm={12} md={6} className="p-4">
                    <section>
                        <div className="model-section w-100">
                            <h1 id="heading">Try it out!</h1>
                            <div className="d-block w-100 file-input-section">
                                <div className="file-input-area"> {/*<-- was form*/}
                                    <span className="file-msg">Drag & Drop to upload image or <u>click here</u>.</span>
                                    <span className="file-msg-mobile">Click here to upload your image.</span>
                                    <input className="file-input" type="file" accept="image/*"
                                           onChange={imageHandler} ref={imageInputRef} />
                                </div>
                                <button className="file-btn" id="cancelBtn" onClick={clearImage}>Cancel</button>
                            </div>
                            <div className="image-container">
                                {isInputClear ?
                                    (<img src={require("../../assets/images/no-image2.png")} alt="upload-car placeholder" width={280} height={280}/>)
                                    :
                                    (<img src={imageData.imageURL} alt="user-uploaded image" width={300} height={300}/>)
                                }
                            </div>
                            {isInputClear  ?
                                (<div></div>)
                                :
                                (<div className="upload-image">
                                    <div className="d-flex justify-content-center">
                                        <Button variant="dark" onClick={showResults} id="test-btn">Test Image</Button>
                                        {isLoading ? <LoadingSpinner/> : void(0)}
                                    </div>

                                    {results.predictedModel ?
                                        (<Row>
                                            <Col xxl={6} className="result-container">
                                                <h4>Model Top Prediction:</h4>
                                                <p className="mb-0 pt-2">Model: {results.predictedModel}</p>
                                                <p>Accuracy: {(results.accuracy*100).toFixed(2)}%</p>
                                            </Col>
                                            <Col xxl={6} className="result-container">
                                                <h4 className="">Top 3 Predictions:</h4>
                                                <ol>
                                                {results.top3Predictions.map(function(prediction, idx){
                                                    return (<li key={idx}>{prediction}</li>)
                                                })}
                                                </ol>
                                            </Col>
                                        </Row>)
                                    :
                                        (<div style={{display:"none"}}></div>)}
                                </div>)
                            }
                        </div>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}