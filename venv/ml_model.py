import random

class Image:
    def __init__(self, image, imageUrl):
        self.image = image
        self.imageUrl = imageUrl

carList = ["Nissan", "Mitsubishi", "Chevrolet", "Subaru", "Mazda", "Ford"]

def create_image(image: object, image_url: str):
    return Image(image, image_url)

def prediction(image: object, image_url: str):
    print(create_image(image, image_url))
    return random.choice(carList), random.randint(50,100)