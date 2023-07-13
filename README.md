# Car-Model-Classification-from-Image

### This repository contains a project created by me as part of my final year dissertation in BSc Computer Science.

#### To view the paper behind this project, refer to [this](https://www.researchgate.net/publication/372159544_Car_make_and_model_classification_from_image) link.

**Aims**
---
The primary aim of this project is to create a deep learning model, capable of classifying the make and model of a car, when given as input an image of a car. In addition, the secondary aim is to develop a responsive web application, which allows users to engage with the model effortessly. The application functions by utilizing the model as its backbone and providing users an easy-to-use interface, where they can upload an image of a car and get back predictions regarding the Top-1 (accuracy-wise) label and model confidence, alongside the Top-3 class labels.

## This repository is organized as follows:

**Branch main:**
Contains the implementation of the training and testing methods used to develop the deep learning model (__car_model_classifier.ipynb__). This file also contains all necessary code required to download the Stanford Cars dataset using both the [Pytorch](https://pytorch.org/vision/stable/generated/torchvision.datasets.StanfordCars.html) and [Kaggle](https://www.kaggle.com/datasets/jutrera/stanford-car-dataset-by-classes-folder) versions.

>>For convenience you may access a slightly modified version of the notebook from __Google Colab__ by clicking on this [link](https://colab.research.google.com/drive/1gFN0DUod0MIeLUUX7Qyermmdt8kEhGhW?usp=sharing). By using this method, you have the advantage to execute the code without needing to download all required libraries. Additionally, when using the Kaggle version of the dataset, the download process happens automatically, elsewise you need to execute this process manually through the command line.

**Branch main-Backend:**
Contains the implementation of a backend server, made with FastAPI, which defines the API route that allows the machine learning model to be created, loaded and classify the user-provided image.

**Branch main-Frontend:**
Is the frontend part of the project. A React.JS application, which provides the user with a responsive UI, through which they can upload an image of a car and get back the Top1 and Top3 label predictions.

