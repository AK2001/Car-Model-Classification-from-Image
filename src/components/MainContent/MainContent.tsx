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
        modelPrediction: "",
        accuracy: -1,
        top3Predictions: []
    })

    // State to know whether input is true or false. True means that user has clicked on "cancel" or no image is yet selected
    const [isInputClear, setIsInputClear] = useState(true);

    const imageInputRef = useRef<HTMLInputElement>(null)

    // Gets called each time user selects an image in the input
    const imageHandler = (event: BaseSyntheticEvent) => {

        let imgURL = "";
        let img = null

        try{
            imgURL = event.target.src
            img = new Image()
            img = "../../assets/images/demo-img-2.jpg"
        }catch (err){}

        try{
            imgURL = URL.createObjectURL(event.target.files[0])
            img = event.target.files[0]
        }catch (err){}

        // Save image data, a URL and the actual object
        setImageData({
            imageURL: imgURL,
            image: img,
        })

        // Each time a different image is selected, results are changed to "default" values
        setResults({
            modelPrediction: "",
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
    };

    // Gets called each time user select one demo image
    const demoImageHandler = (event: BaseSyntheticEvent) => {
        console.log(event.target)
    }

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

    // Shows results to the user - makes POST request to the backend
    async function showResults() {

        document.getElementById("test-btn")!.style.display = "none"; // Make "test" btn invisible
        document.getElementById('cancelBtn')!.setAttribute("disabled","disabled"); // Disable "cancel" btn

        setIsLoading(true); // Show loading spinner

        // Data (image) for Backend
        const data = {"file": imageData.image}

        // Post request
        await axios.post("/API/predictImage", data, {headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}})
            .then(res =>{
                setResults({
                    modelPrediction: res.data.modelPrediction,
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
                <Col sm={12} md={6} className="p-4 welcome-section">
                    <section>
                        <>
                            <h1>Car model classification using</h1>
                            <h1>Convolutional Neural Networks.</h1>
                            <div className="project-intro pt-sm-4">
                                <h3 className="mt-4">A project made by <a href='/#'>Alexandros Kelaiditis</a> as part of his
                                    dissertation in Computer Science.</h3>
                                <p>Interested in learning how it works? <a href="/#">Click here</a>.</p>

                                <p className="mt-4 fs-5"> To get started simply <b>upload</b> an image of a car, <b>click</b> the button that will appear and wait
                                    a couple of seconds as the model tries to find the model of your Car.</p>
                            </div>

                            <>
                                <p className="fs-5">Need a quick demo? Try one of these images: </p>
                                <div className="demo-images">
                                    <img id="demo-1" src={require("../../assets/images/demo-img-1.jpg")} width={140} height={140} alt="demo image 1" onClick={imageHandler}/>
                                    <img src={require("../../assets/images/demo-img-2.jpg")} width={140} height={140} alt="demo image 2" onClick={demoImageHandler}/>
                                    <img src={require("../../assets/images/demo-img-3.jpg")} width={140} height={140} alt="demo image 3" onClick={demoImageHandler}/>
                                </div>
                            </>

                        </>
                    </section>
                </Col>

                <Col sm={12} md={6} className="p-4 model-section">
                    <section>
                        <div className="w-100">
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
                                    (<img src={require("../../assets/images/no-image-placeholder.png")} alt="upload-car placeholder" width={280} height={280}/>)
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

                                    {results.modelPrediction ?
                                        (<Row>
                                            <Col xxl={6} className="result-container">
                                                <h4>Model Top Prediction:</h4>
                                                <p className="mb-0 pt-2">Model: {results.modelPrediction}</p>
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