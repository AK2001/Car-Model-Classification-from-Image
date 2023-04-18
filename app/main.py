from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .model.ml_model import model_prediction, get_class_names
import PIL.Image

import io

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/API/getClasses")
async def get_dataset_class_names():
    return get_class_names()


@app.post("/API/predictImage")
async def predict_image_with_model(file: UploadFile = None, demo_pred: str = ""):
    # If the user has uploaded their own image, then demo_pred = "", which means that they haven't
    # selected a demo image.
    if demo_pred != "":
        image = PIL.Image.open(open("static/images/"+demo_pred+".jpg", 'rb'))
    else:
        image = PIL.Image.open(io.BytesIO(file.file.read()))

    # Uncomment to open image locally
    # image.show()

    # Get image prediction
    pred, acc, top3_preds = model_prediction(image)

    return {"modelPrediction": pred,
            "modelAccuracy": acc,
            "top3Predictions": top3_preds}

# FastApi resource for image file input: https://fastapi.tiangolo.com/tutorial/request-files/
