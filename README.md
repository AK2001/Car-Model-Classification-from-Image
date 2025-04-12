# Car Make & Model Classification from Images

A final year BSc Computer Science project focused on building a deep learning model that classifies the **make and model** 
of a car from an input image. The system is wrapped in a responsive web application so users can interact with the
model.

📄 **Read the paper**: [Car make and model classification from image](https://www.researchgate.net/publication/372159544_Car_make_and_model_classification_from_image)

---

## 🎯 Project Goals

- **Primary Objective**:  
  Develop a deep learning model to classify the *make and model* of a car from a single image.

- **Secondary Objective**:  
  Build a responsive **web application** where users can:
    - Upload an image of a car.
    - Receive the **Top-1** predicted label with confidence.
    - View the **Top-3** most likely predictions.

---

## 🗂️ Project Structure

```
Car-Model-Classification-from-Image/
├── app/ # FastAPI server
├── frontend/ # React + TypeScript web app
├── car_model_classifier.ipynb # Jupyter notebook for training and experimentation
└── README.md # Project documentation
```

---

## 🛠️ Technologies Used

- **Backend**: Python, PyTorch
- **Frontend**: React, TypeScript
- **Package Managers**: `pip`, `npm`

---

## ⚙️ Setup Instructions

### 🧠 Backend

1. **Clone the repository:**

```shell
git clone https://github.com/your-username/Car-Model-Classification-from-Image.git
cd car-model-classification-from-image\app
```

2. **Set up a virtual environment:**

```shell
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**

```shell
pip install -r requirements.txt
```

4. Add the dataset

Stanford Cars Dataset: [source-link](https://www.kaggle.com/datasets/jessicali9530/stanford-cars-dataset)

5. Run the backend (FastAPI) server

 ```shell
 python app/main.py
 ```

<br/>

### 🌐 Frontend

1. **Navigate to the frontend directory::**

```shell
cd car-model-classification-from-image\interface
```

2. **Install frontend dependencies:**

```shell
npm install
```

3. **Start the frontend development server:**

```shell
npm start
```
