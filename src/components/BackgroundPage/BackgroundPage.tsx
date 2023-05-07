import "./BackgroundPage.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import NotebookCell from "../NotebookCell/NotebookCell";

export default function BackgroundPage(){
    return (
        <Container fluid className="main-container min-vh-100">
            <Row>
                <Col sm={12} md={6} className="p-4 welcome-section">
                    <div className="pt-2">
                        <h2>Interested in learning how the Network was created or how it works? Take a look!</h2>
                        <p className="mt-4 fs-5"><span className="emp-text">To begin with</span>, the Network was both trained and tested using the <a href="https://ai.stanford.edu/~jkrause/cars/car_dataset.html" target="_blank" rel="noreferrer">Stanford Car Dataset</a>
                            , which contains around <b>16K</b>! labeled images of cars.</p>

                        <p className="mt-4 fs-5"><span className="emp-text">Moreover</span>, while a variety of model architectures were tested, ranging from "simple" CNNs to more complex ones,
                            such as ResNet50, it was ultimately decided to use the <a href="https://arxiv.org/pdf/1512.03385.pdf" target="_blank" rel="noreferrer">ResNet34</a> architecture through&nbsp;
                            <span className="emp-text">Transfer Learning</span> in order to maximize model performance.</p>

                        <p className="mt-2 fs-6">With a total number of <span className="emp-text">21.797.672M</span><sup><a href="https://pytorch.org/vision/main/models/generated/torchvision.models.resnet34.html#torchvision.models.ResNet34_Weights" target="_blank" rel="noreferrer">[1]</a></sup>
                            &nbsp;parameters and a remarkable Top5 accuracy of <b>91.42%</b> on ImageNet-1K, ResNet34 is a better choice than other well-known architectures.</p>
                    </div>

                </Col>

                <Col sm={12} md={6} className="p-4 demonstration-section">

                    <h1 className="heading">Behind the Scenes</h1>


                    <div className="demo-step">
                        <h3>1. Define image transforms</h3>
                        <div className="notebook-cell">
                            <NotebookCell tableRow={
                                <>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># Since the images we get may not be the size we want, we need to
                                        resize them, transform them to a tensor (in order to do computations on them) and normalize their mean and standard deviations.</span></td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">transforms = <span>transforms</span>.Compose([</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">&nbsp;&nbsp;<span>transforms</span>.Resize((400, 400)),</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">&nbsp;&nbsp;<span>transforms</span>.ToTensor(),</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">&nbsp;&nbsp;<span>transforms</span>.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">])</td>
                                    </tr>
                                </>
                            }/>
                        </div>
                    </div>

                    <div className="demo-next">
                        <img src={require("../../assets/images/demo-arrow.png")}  alt="demo arrow"/>
                    </div>

                    <div className="demo-step">
                        <h3>2. Apply transformations</h3>
                        <div className="notebook-cell">
                            <NotebookCell tableRow={
                                <>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># Transform user image.</span></td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># Now that image is a 3D tensor [ColourChannels, Height, Width], we use unsqueeze()
                                        to add a single dimension. This is because our model is expecting a 4D tensor as input</span></td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">transformed_image = <span>transforms</span>(image).unsqueeze(<span>dim</span>=0)</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># After transforms</span></td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">print(transformed_image.<span>shape</span>)</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># &gt;&gt; torch.Size([1, 3, 400, 400])</span>)</td>
                                    </tr>
                                </>
                            }/>
                        </div>
                    </div>

                    <div className="demo-next">
                        <img src={require("../../assets/images/demo-arrow.png")}  alt="demo arrow"/>
                    </div>

                    <div className="demo-step">
                        <h3>3. Pass the image through the model.</h3>
                        <div className="notebook-cell">
                            <NotebookCell tableRow={
                                <>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># Next, we pass the image through our model
                                        and store the output.</span></td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># Note the .to(device) part! This is when we tell the program
                                            to do its calculations on the provided device (GPU).</span></td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code">image_prediction = <span>model</span>(transformed_image.to(device))</td>
                                    </tr>
                                    <tr className="line">
                                        <td className="line-number"></td>
                                        <td className="line-code"><span className="comment"># Afterwards, the predictions pass through
                                        another process to find the labels of Top1 and Top3 prediction accuracies. We use PyTorch's topk() method for that.</span></td>
                                    </tr>
                                </>
                            }/>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}