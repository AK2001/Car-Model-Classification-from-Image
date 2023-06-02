import PIL.Image
from app.model.ml_model import prepare_image


def test_transformed_image_size():
    image = PIL.Image.open(open("app/static/images/demo-img-1.jpg", 'rb'))
    image_size = (300, 300)
    transformed_image = prepare_image(image, image_size)
    assert transformed_image.size() == (3, 300, 300)


def test_transformed_image_size_false():
    image = PIL.Image.open(open("app/static/images/demo-img-1.jpg", 'rb'))
    image_size = (300, 300)
    transformed_image = prepare_image(image, image_size)
    assert transformed_image.size() == (3, 400, 400)