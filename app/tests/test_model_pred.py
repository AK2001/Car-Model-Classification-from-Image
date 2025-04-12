import PIL.Image
from app.model.ml_model import model_prediction, get_class_names


def test_model_prediction_in_range_of_labels():
    image = PIL.Image.open(open("app/static/images/demo-img-1.jpg", 'rb'))
    top_1_pred, prediction_acc, top3_preds = model_prediction(image)
    assert top_1_pred in get_class_names()


def test_model_prediction_returns_top_3_predictions():
    image = PIL.Image.open(open("app/static/images/demo-img-1.jpg", 'rb'))
    top_1_pred, prediction_acc, top3_preds = model_prediction(image)
    assert len(top3_preds) == 3
