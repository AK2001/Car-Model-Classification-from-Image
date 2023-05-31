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

    """
    Makes a prediction on a given image and
    returns the Top1 pred, Top1 prediction accuracy, and Top3 predictions (without accuracies)

    file: A single file of UploadFile type. It is passed as data in the POST request
    demo_pred: A parameter in the request that defines whether the request concerns a static image (demo image)
               If demo pred != "", then it will be either [demo-img-1, demo-img-2, demo-img-3].
    """

    if demo_pred != "":
        image = PIL.Image.open(open("static/images/"+demo_pred+".jpg", 'rb'))
    else:
        image = PIL.Image.open(io.BytesIO(file.file.read()))

    # Get model prediction on image
    pred, acc, top3_preds = model_prediction(image)

    return {"modelPrediction": pred,
            "modelAccuracy": acc,
            "top3Predictions": top3_preds}
