from fastapi import FastAPI
from pydantic import BaseModel
from ml_model import prediction
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000"
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
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


class Image(BaseModel):
    image: object
    image_url: str


@app.post("/image/")
def create_image():
    return {"prediction": "AEK",
            "accuracyy": 69}


@app.post("/generate")
def generate_results(image, image_url: str):
    print(image, image_url)
    pred, acc = prediction(image, image_url)
    return {"prediction": pred,
            "accuracyy": acc}


@app.post("/test")
def generate_results(image):
    print(image)
    return {"prediction": "AEK",
            "accuracyy": 69}