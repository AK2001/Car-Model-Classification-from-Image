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

            // Each time a different image is selected, results are "default"
            setResults({
                predictedModel: "",
                accuracy: -1,
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

        document.getElementById("test-btn")!.style.display = "none";

        setIsLoading(true); // Show loading spinner

        // const formData = new FormData();
        // if (imageInputRef.current!.files != null){
        //     formData.append(
        //         "image",
        //         imageInputRef.current!.files[0]
        //     );
        // }

        // Data (image) for Backend
        const data = {"file": imageData.image}

        // Post request
        await axios.post("/API/userImage", data, {headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}})
            .then(res =>{
                setResults({
                    predictedModel: res.data.modelPrediction,
                    accuracy: res.data.modelAccuracy,})
                setIsLoading(false) // Hide loading spinner
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
        })
    }

    return (
        <Container fluid className="main-container min-vh-100">
            <Row>
                <Col sm={12} md={6} className="p-5">
                    <section>
                        <div className="welcome-section">
                            <h1>Car model classification using</h1>
                            <h1>Convolutional Neural Networks.</h1>
                            <div className="project-intro pt-sm-4">
                                <h3 className="mt-4">A project made by <a href='/#'>Alexandros Kelaiditis</a> as part of his
                                    dissertation in Compute Science.</h3>
                                <p>Interested in learning how it works? <a href="/#">Click here</a>.</p>

                                <p className="mt-4 fs-4"> To get started simply <b>upload</b> an image of a car, <b>click</b> the button that will appear and wait
                                    as the network tries to find the model of your Car.</p>
                            </div>
                        </div>
                    </section>
                </Col>

                <Col sm={12} md={6} className="p-5">
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
                                <button className="file-btn" onClick={clearImage}>Cancel</button>
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
                                (<div className="d-inline-flex w-100 upload-image">
                                    <Button variant="dark" onClick={showResults} id="test-btn">Test Image</Button>
                                    {isLoading ? <LoadingSpinner/> : void(0)}
                                    {results.predictedModel ?
                                        (<div className="results-container">
                                            <h4>Results:</h4>
                                            <p>Model: {results.predictedModel}</p>
                                            <p>Accuracy: {results.accuracy}%</p>
                                        </div>)
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