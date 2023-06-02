from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .model.ml_model import model_prediction, get_class_names
import PIL.Image

import io

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

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
    demo_pred: A parameter in the request that defines whether the request concerns
               prediction on a static image (demo image)
               Valid values are [demo-img-1, demo-img-2, demo-img-3].
    """
    if file is None and demo_pred == "":
        raise HTTPException(status_code=400,
                            detail="Invalid request. Request should contain either an image file or "
                                   "a parameter of a specific demo id")

    elif file is None and demo_pred not in ["demo-img-1", "demo-img-2", "demo-img-3"]:
        raise HTTPException(status_code=400,
                            detail="Invalid request. Invalid parameter value")

    if file:
        image = PIL.Image.open(io.BytesIO(file.file.read()))
    else:
        image = PIL.Image.open(open("app/static/images/" + demo_pred + ".jpg", 'rb'))

    # Get model prediction on image
    pred, acc, top3_preds = model_prediction(image)

    return {"modelPrediction": pred,
            "modelAccuracy": acc,
            "top3Predictions": top3_preds}
