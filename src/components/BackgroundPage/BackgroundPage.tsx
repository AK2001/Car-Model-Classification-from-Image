import "./BackgroundPage.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import NotebookCell from "../NotebookCell/NotebookCell";

export default function BackgroundPage(){
    // List of all labels the model can classify
    let list: Array<String> = ['AM General Hummer SUV 2000',
        'Acura RL Sedan 2012',
        'Acura TL Sedan 2012',
        'Acura TL Type-S 2008',
        'Acura TSX Sedan 2012',
        'Acura Integra Type R 2001',
        'Acura ZDX Hatchback 2012',
        'Aston Martin V8 Vantage Convertible 2012',
        'Aston Martin V8 Vantage Coupe 2012',
        'Aston Martin Virage Convertible 2012',
        'Aston Martin Virage Coupe 2012',
        'Audi RS 4 Convertible 2008',
        'Audi A5 Coupe 2012',
        'Audi TTS Coupe 2012',
        'Audi R8 Coupe 2012',
        'Audi V8 Sedan 1994',
        'Audi 100 Sedan 1994',
        'Audi 100 Wagon 1994',
        'Audi TT Hatchback 2011',
        'Audi S6 Sedan 2011',
        'Audi S5 Convertible 2012',
        'Audi S5 Coupe 2012',
        'Audi S4 Sedan 2012',
        'Audi S4 Sedan 2007',
        'Audi TT RS Coupe 2012',
        'BMW ActiveHybrid 5 Sedan 2012',
        'BMW 1 Series Convertible 2012',
        'BMW 1 Series Coupe 2012',
        'BMW 3 Series Sedan 2012',
        'BMW 3 Series Wagon 2012',
        'BMW 6 Series Convertible 2007',
        'BMW X5 SUV 2007',
        'BMW X6 SUV 2012',
        'BMW M3 Coupe 2012',
        'BMW M5 Sedan 2010',
        'BMW M6 Convertible 2010',
        'BMW X3 SUV 2012',
        'BMW Z4 Convertible 2012',
        'Bentley Continental Supersports Conv. Convertible 2012',
        'Bentley Arnage Sedan 2009',
        'Bentley Mulsanne Sedan 2011',
        'Bentley Continental GT Coupe 2012',
        'Bentley Continental GT Coupe 2007',
        'Bentley Continental Flying Spur Sedan 2007',
        'Bugatti Veyron 16.4 Convertible 2009',
        'Bugatti Veyron 16.4 Coupe 2009',
        'Buick Regal GS 2012',
        'Buick Rainier SUV 2007',
        'Buick Verano Sedan 2012',
        'Buick Enclave SUV 2012',
        'Cadillac CTS-V Sedan 2012',
        'Cadillac SRX SUV 2012',
        'Cadillac Escalade EXT Crew Cab 2007',
        'Chevrolet Silverado 1500 Hybrid Crew Cab 2012',
        'Chevrolet Corvette Convertible 2012',
        'Chevrolet Corvette ZR1 2012',
        'Chevrolet Corvette Ron Fellows Edition Z06 2007',
        'Chevrolet Traverse SUV 2012',
        'Chevrolet Camaro Convertible 2012',
        'Chevrolet HHR SS 2010',
        'Chevrolet Impala Sedan 2007',
        'Chevrolet Tahoe Hybrid SUV 2012',
        'Chevrolet Sonic Sedan 2012',
        'Chevrolet Express Cargo Van 2007',
        'Chevrolet Avalanche Crew Cab 2012',
        'Chevrolet Cobalt SS 2010',
        'Chevrolet Malibu Hybrid Sedan 2010',
        'Chevrolet TrailBlazer SS 2009',
        'Chevrolet Silverado 2500HD Regular Cab 2012',
        'Chevrolet Silverado 1500 Classic Extended Cab 2007',
        'Chevrolet Express Van 2007',
        'Chevrolet Monte Carlo Coupe 2007',
        'Chevrolet Malibu Sedan 2007',
        'Chevrolet Silverado 1500 Extended Cab 2012',
        'Chevrolet Silverado 1500 Regular Cab 2012',
        'Chrysler Aspen SUV 2009',
        'Chrysler Sebring Convertible 2010',
        'Chrysler Town and Country Minivan 2012',
        'Chrysler 300 SRT-8 2010',
        'Chrysler Crossfire Convertible 2008',
        'Chrysler PT Cruiser Convertible 2008',
        'Daewoo Nubira Wagon 2002',
        'Dodge Caliber Wagon 2012',
        'Dodge Caliber Wagon 2007',
        'Dodge Caravan Minivan 1997',
        'Dodge Ram Pickup 3500 Crew Cab 2010',
        'Dodge Ram Pickup 3500 Quad Cab 2009',
        'Dodge Sprinter Cargo Van 2009',
        'Dodge Journey SUV 2012',
        'Dodge Dakota Crew Cab 2010',
        'Dodge Dakota Club Cab 2007',
        'Dodge Magnum Wagon 2008',
        'Dodge Challenger SRT8 2011',
        'Dodge Durango SUV 2012',
        'Dodge Durango SUV 2007',
        'Dodge Charger Sedan 2012',
        'Dodge Charger SRT-8 2009',
        'Eagle Talon Hatchback 1998',
        'FIAT 500 Abarth 2012',
        'FIAT 500 Convertible 2012',
        'Ferrari FF Coupe 2012',
        'Ferrari California Convertible 2012',
        'Ferrari 458 Italia Convertible 2012',
        'Ferrari 458 Italia Coupe 2012',
        'Fisker Karma Sedan 2012',
        'Ford F-450 Super Duty Crew Cab 2012',
        'Ford Mustang Convertible 2007',
        'Ford Freestar Minivan 2007',
        'Ford Expedition EL SUV 2009',
        'Ford Edge SUV 2012',
        'Ford Ranger SuperCab 2011',
        'Ford GT Coupe 2006',
        'Ford F-150 Regular Cab 2012',
        'Ford F-150 Regular Cab 2007',
        'Ford Focus Sedan 2007',
        'Ford E-Series Wagon Van 2012',
        'Ford Fiesta Sedan 2012',
        'GMC Terrain SUV 2012',
        'GMC Savana Van 2012',
        'GMC Yukon Hybrid SUV 2012',
        'GMC Acadia SUV 2012',
        'GMC Canyon Extended Cab 2012',
        'Geo Metro Convertible 1993',
        'HUMMER H3T Crew Cab 2010',
        'HUMMER H2 SUT Crew Cab 2009',
        'Honda Odyssey Minivan 2012',
        'Honda Odyssey Minivan 2007',
        'Honda Accord Coupe 2012',
        'Honda Accord Sedan 2012',
        'Hyundai Veloster Hatchback 2012',
        'Hyundai Santa Fe SUV 2012',
        'Hyundai Tucson SUV 2012',
        'Hyundai Veracruz SUV 2012',
        'Hyundai Sonata Hybrid Sedan 2012',
        'Hyundai Elantra Sedan 2007',
        'Hyundai Accent Sedan 2012',
        'Hyundai Genesis Sedan 2012',
        'Hyundai Sonata Sedan 2012',
        'Hyundai Elantra Touring Hatchback 2012',
        'Hyundai Azera Sedan 2012',
        'Infiniti G Coupe IPL 2012',
        'Infiniti QX56 SUV 2011',
        'Isuzu Ascender SUV 2008',
        'Jaguar XK XKR 2012',
        'Jeep Patriot SUV 2012',
        'Jeep Wrangler SUV 2012',
        'Jeep Liberty SUV 2012',
        'Jeep Grand Cherokee SUV 2012',
        'Jeep Compass SUV 2012',
        'Lamborghini Reventon Coupe 2008',
        'Lamborghini Aventador Coupe 2012',
        'Lamborghini Gallardo LP 570-4 Superleggera 2012',
        'Lamborghini Diablo Coupe 2001',
        'Land Rover Range Rover SUV 2012',
        'Land Rover LR2 SUV 2012',
        'Lincoln Town Car Sedan 2011',
        'MINI Cooper Roadster Convertible 2012',
        'Maybach Landaulet Convertible 2012',
        'Mazda Tribute SUV 2011',
        'McLaren MP4-12C Coupe 2012',
        'Mercedes-Benz 300-Class Convertible 1993',
        'Mercedes-Benz C-Class Sedan 2012',
        'Mercedes-Benz SL-Class Coupe 2009',
        'Mercedes-Benz E-Class Sedan 2012',
        'Mercedes-Benz S-Class Sedan 2012',
        'Mercedes-Benz Sprinter Van 2012',
        'Mitsubishi Lancer Sedan 2012',
        'Nissan Leaf Hatchback 2012',
        'Nissan NV Passenger Van 2012',
        'Nissan Juke Hatchback 2012',
        'Nissan 240SX Coupe 1998',
        'Plymouth Neon Coupe 1999',
        'Porsche Panamera Sedan 2012',
        'Ram C/V Cargo Van Minivan 2012',
        'Rolls-Royce Phantom Drophead Coupe Convertible 2012',
        'Rolls-Royce Ghost Sedan 2012',
        'Rolls-Royce Phantom Sedan 2012',
        'Scion xD Hatchback 2012',
        'Spyker C8 Convertible 2009',
        'Spyker C8 Coupe 2009',
        'Suzuki Aerio Sedan 2007',
        'Suzuki Kizashi Sedan 2012',
        'Suzuki SX4 Hatchback 2012',
        'Suzuki SX4 Sedan 2012',
        'Tesla Model S Sedan 2012',
        'Toyota Sequoia SUV 2012',
        'Toyota Camry Sedan 2012',
        'Toyota Corolla Sedan 2012',
        'Toyota 4Runner SUV 2012',
        'Volkswagen Golf Hatchback 2012',
        'Volkswagen Golf Hatchback 1991',
        'Volkswagen Beetle Hatchback 2012',
        'Volvo C30 Hatchback 2012',
        'Volvo 240 Sedan 1993',
        'Volvo XC90 SUV 2007',
        'smart fortwo Convertible 2012']

    return (
        <Container fluid className="main-container min-vh-100">
            <Row>
                <Col sm={12} md={6} className="p-4 welcome-section">
                    <div className="pt-2">
                        <h2>Interested in learning how the Network was created or how it works? Take a look!</h2>
                        <p className="mt-4 fs-5"><span className="emp-text">To begin with</span>, the underlying network is based on the <a href="https://arxiv.org/pdf/1512.03385.pdf" target="_blank" rel="noreferrer">ResNet34</a> architecture,
                            pre-trained on the <a href="https://www.image-net.org/" target="_blank" rel="noreferrer">ImageNet</a> dataset.</p>

                        <p className="mt-4 fs-5">As far as the <span className="emp-text">training</span> is concerned, the network is fine tuned using
                            the <a href="https://ai.stanford.edu/~jkrause/cars/car_dataset.html" target="_blank" rel="noreferrer">Stanford Car Dataset</a>
                            , which contains around <b>16K</b>! labeled images of cars.</p>

                        <p className="mt-4 fs-5"><span className="emp-text">Moreover</span>, to achieve the final model performance, we experimented with a variety of CNN architectures, ranging from "simple" ones, such as <a href="https://arxiv.org/abs/1409.1556" target="_blank" rel="noreferrer">VGG</a>,
                            to more complex ones, such as <a href="https://arxiv.org/abs/1409.4842" target="_blank" rel="noreferrer">GoogLeNet</a>. <span className="emp-text">Ultimately</span> after comparing results, ResNet was able to achieve, well... the second best performance...with a Top-1 accuracy
                            of <span className="emp-text">90.6%</span> compared to ResNet-50's <span className="emp-text">91.05%</span></p>

                        <p className="mt-4 fs-5"><span className="emp-text">However</span>, the final decision was made based on their performance on prediction time. Using this metric the model came at the ss..second place, again,
                            having an average prediction time per image of <span className="emp-text">9</span> milliseconds, compared to GoogLeNet's <span className="emp-text">7</span>.
                        </p>

                        <p className="mt-4 fs-5"><span className="emp-text">At the end, </span>after evaluating all options, ResNet-34 was ultimately chosen for this project.</p>
                    </div>

                </Col>

                <Col sm={12} md={6} className="p-4 demonstration-section">

                    <h1 className="heading">Behind the Scenes</h1>

                    <Tabs
                        defaultActiveKey="image"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >

                        <Tab eventKey="results" title="Results and comparison">
                            <div className="result-graphs d-inline-block">
                                <img src={require("../../assets/images/result_graph1.jpg")}  width={250} alt="demo arrow"/>
                                <img src={require("../../assets/images/result_graph2.jpg")}  width={250} alt="demo arrow"/>
                            </div>
                            <div className="result-graphs">
                                <img id="comparison-graph" src={require("../../assets/images/prediction_graph.jpg")}  width={280} alt="demo arrow"/>
                            </div>
                        </Tab>


                        <Tab eventKey="image" title="Image preprocessing">
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
                        </Tab>

                        <Tab eventKey="label-list" title="Car Model list" className="model-list-container">
                            <Table className="label-table" striped bordered hover variant="dark">
                                <tbody>
                                {list.map(function(model, idx){
                                    return (<tr><td>{idx+1}</td><td>{model}</td></tr>)
                                })}
                                </tbody>
                            </Table>
                        </Tab>

                    </Tabs>

                </Col>
            </Row>
        </Container>
    );
}