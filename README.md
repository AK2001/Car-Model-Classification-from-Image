# Car-Model-Classification-from-Image

### This repository contains a project created by me as part of my final year dissertation in Computer Science.

### <u>Kidnly note that this is an unfinished work and is subject to changes and/or bugs!</u>

**Aims**
---
The aim of this project is to create a machine learning model using Transfer Learning method, in order to be able to classify models of car based on a given car image. Due to the nature of the problem, I decided to use a pre-trained ResNet34 architecture, which by no surprise managed to have a Top1 accuracy of 90.41%.

**Branch main-Backend:**
Contains the implementation of a backend server, made with FastAPI, which defines the API route that allows the machine learning model to be created, loaded and classify the user-provided image.

**Branch main-Frontend:**
Is the frontend part of the project. A React.JS application, which provides the user with a responsive UI, through which they can upload an image of a car and get back the Top1 and Top3 label predictions.

