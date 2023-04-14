from fastapi import FastAPI, UploadFile
from model.ml_model import model_prediction, get_class_names
from fastapi.middleware.cors import CORSMiddleware
import PIL.Image

import io

app = FastAPI()

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
async def predict_image_with_model(file: UploadFile):

    # Create PIL image
    image = PIL.Image.open(io.BytesIO(file.file.read()))

    # Uncomment to open image locally
    # image.show()

    # Get image prediction
    pred, acc, top3_preds = model_prediction(image)

    # pred, acc = stupid_prediction()
    return {"modelPrediction": pred,
            "modelAccuracy": acc,
            "top3Predictions": top3_preds}

# FastApi resource for image file input: https://fastapi.tiangolo.com/tutorial/request-files/
