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
        demoImageId: "",
    });

    // State for result data
    const[results, setResults] = useState({
        modelPrediction: "",
        accuracy: -1,
        top3Predictions: []
    })

    // State to store information of whether input is clear or not. Is true whenever user selects or uploads an image.
    const [isInputClear, setIsInputClear] = useState(true);

    // State to store information of whether an error occurred while uploading image to backend
    const [errorOccurredDuringImageUpload, setErrorOccurredDuringImageUpload] = useState(false);

    // Holds a reference to the input
    const imageInputRef = useRef<HTMLInputElement>(null)

    // Gets called each time user selects an image as input (Or clicks on Demo)
    const imageHandler = (event: BaseSyntheticEvent) => {
        event.preventDefault()

        // Clear any errors that may have happened
        setErrorOccurredDuringImageUpload(false)

        let imageHasChanged = true;
        let imgURL = "";
        let img = null;
        let demoImageId = "";

        // For demo images (We check if the event target has an ID - Only Demo images have an id)
        if (event.target.id) {
            imgURL = event.target.src
            demoImageId = event.target.id
        }else if (event.target.files.length !== 0){
            // For user uploaded images (If the event.target.files.length === 0, then User clicked "cancel" upon input)
            imgURL = URL.createObjectURL(event.target.files[0])
            img = event.target.files[0]
        } else {
            imageHasChanged = false
        }

        // If image was changed during input (In case user clicked "cancel" upon input)
        if (imageHasChanged) {

            // Save image data, a URL and the actual object
            setImageData({
                imageURL: imgURL,
                image: img,
                demoImageId: demoImageId,
            })

            // Each time a different image is selected, results are changed to "default" values
            setResults({
                modelPrediction: "",
                accuracy: -1,
                top3Predictions: [],
            })

            // If input was clear (NO image selected, change that upon selection)
            if (isInputClear) {
                setIsInputClear(!isInputClear)
            }

            // Display the "test" button
            if (document.getElementById("test-btn") != null) {
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
            demoImageId: "",
        })

        imageInputRef.current!.value = "";
    }

    // State to store loading component status
    const [isLoading, setIsLoading] = useState(false);

    // Shows results to the user - makes POST request to the backend
    async function showResults() {

        document.getElementById("test-btn")!.style.display = "none"; // Make "test" btn invisible
        document.getElementById('cancelBtn')!.setAttribute("disabled","disabled"); // Disable "cancel" btn
        // Disable demo image section during image testing
        for (let i=1; i <=3; i++){
            document.getElementById("demo-img-"+i.toString())!.style.pointerEvents = "none";
        }
        // Disable user input also
        document.getElementById("user-input")!.style.pointerEvents = "none";

        setIsLoading(true); // Show loading spinner

        let data: {}

        // For demo images
        if (imageData.demoImageId !== ""){
            data = {"file": null, "demo_pred": 0}
        }else{
            // For user-uploaded images
            data = {"file": imageData.image}
        }

        // Post request
        await axios.post("/API/predictImage", data,
            {headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data'},
                   params: {demo_pred: imageData.demoImageId}
            })
            .then(res =>{
                setResults({
                    modelPrediction: res.data.modelPrediction,
                    accuracy: res.data.modelAccuracy,
                    top3Predictions: res.data.top3Predictions,})
            }).catch(err => {
                console.log(err)
                setErrorOccurredDuringImageUpload(true);
            }).finally(() => {
                setIsLoading(false) // Hide loading spinner
                document.getElementById('cancelBtn')!.removeAttribute("disabled"); // Enable "cancel" btn
                for (let i=1; i <=3; i++){
                    document.getElementById("demo-img-"+i.toString())!.style.pointerEvents = "auto";
                }
                document.getElementById("user-input")!.style.pointerEvents = "auto";
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
                                <p>Interested in learning how it works? <a href="/#">Learn more here</a>.</p>

                                <p className="mt-4 fs-5"> To get started, simply <b>upload</b> an image of a car, <b>click</b> on the button that appears below and wait
                                    as the Network tries to classify the car's model.</p>
                                <p className="mt-4 fs-5"> Please <u>note</u> that the Network can only classify <b>196</b> different car models. To view the
                                    entire list of models, <a href="/background">click here</a>.</p>
                            </div>

                            <>
                                <p className="fs-5">Need a quick demo? Try one of these sample images: </p>
                                <div className="demo-images">
                                    <img className="demo-image mb-0" id="demo-img-1" src={require("../../assets/images/demo-img-1.jpg")} width={140} height={140} alt="demo image 1" onClick={imageHandler}/>
                                    <img className="demo-image mb-0" id="demo-img-2" src={require("../../assets/images/demo-img-2.jpg")} width={140} height={140} alt="demo image 2" onClick={imageHandler}/>
                                    <img className="demo-image mb-0" id="demo-img-3" src={require("../../assets/images/demo-img-3.jpg")} width={140} height={140} alt="demo image 3" onClick={imageHandler}/>
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
                                <div id="user-input" className="file-input-area"> {/*<-- was form*/}
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
                                (<></>)
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
                                        errorOccurredDuringImageUpload ?
                                            (<div className="error-message">
                                                <p className="">Oops...Looks like something went wrong.</p>
                                                <p className="">If you keep encountering the same error, feel free to <a href="mailto:al.kelaiditis@gmail.com">contact me</a>.</p>
                                            </div>)
                                        :
                                            (<></>)

                                    }
                                </div>)
                            }
                        </div>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}