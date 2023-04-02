from fastapi import FastAPI, UploadFile
from model.ml_model import stupid_prediction, model_prediction
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


@app.get("/")
async def root():
    return {"message": "Home page"}


@app.post("/API/userImage")
async def create_upload_file(file: UploadFile):

    # Create PIL image
    image = PIL.Image.open(io.BytesIO(file.file.read()))
    # Uncomment to show image locally
    # image.show()

    # Get image prediction
    pred, acc, top3_preds = model_prediction(image)

    # pred, acc = stupid_prediction()
    return {"modelPrediction": pred,
            "modelAccuracy": acc,
            "top3Predictions": top3_preds}

# FastApi resource for image file input: https://fastapi.tiangolo.com/tutorial/request-files/
