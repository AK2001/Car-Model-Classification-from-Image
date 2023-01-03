from fastapi import FastAPI, UploadFile
from ml_model import stupid_prediction
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


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/API/userImage")
async def create_upload_file(file: UploadFile):
    print(file)
    print(file.filename)

    # Used to open the image locally
    image = PIL.Image.open(io.BytesIO(file.file.read()))
    image.show()

    pred, acc = stupid_prediction()
    return {"modelPrediction": pred,
            "modelAccuracy": acc}

# HELP: https://fastapi.tiangolo.com/tutorial/request-files/
