import torch
from torchvision import models
from torchvision import transforms
from PIL import Image
from pathlib import Path
from typing import Tuple

carList = ["Nissan", "Mitsubishi", "Chevrolet", "Subaru", "Mazda", "Ford"]
MODEL_PATH = Path("app/model/model_dict/pytorch_model_ResNet34")

CLASS_NAMES = ['AM General Hummer SUV 2000',
               'Acura RL Sedan 2012',
               'Acura TL Sedan 2012',
               'Acura TL Type-S 2008',
               'Acura TSX Sedan 2012',
               'Acura Integra Type R 2001',
               'Acura ZDX Hatchback 2012',
               'Aston Martin V8 Vantage Convertible 2012',
               'Aston Martin V8 Vantage Coupe 2012',
               'Aston Martin Virage Convertible 2012',
               'Aston Martin Virage Coupe 2012',
               'Audi RS 4 Convertible 2008',
               'Audi A5 Coupe 2012',
               'Audi TTS Coupe 2012',
               'Audi R8 Coupe 2012',
               'Audi V8 Sedan 1994',
               'Audi 100 Sedan 1994',
               'Audi 100 Wagon 1994',
               'Audi TT Hatchback 2011',
               'Audi S6 Sedan 2011',
               'Audi S5 Convertible 2012',
               'Audi S5 Coupe 2012',
               'Audi S4 Sedan 2012',
               'Audi S4 Sedan 2007',
               'Audi TT RS Coupe 2012',
               'BMW ActiveHybrid 5 Sedan 2012',
               'BMW 1 Series Convertible 2012',
               'BMW 1 Series Coupe 2012',
               'BMW 3 Series Sedan 2012',
               'BMW 3 Series Wagon 2012',
               'BMW 6 Series Convertible 2007',
               'BMW X5 SUV 2007',
               'BMW X6 SUV 2012',
               'BMW M3 Coupe 2012',
               'BMW M5 Sedan 2010',
               'BMW M6 Convertible 2010',
               'BMW X3 SUV 2012',
               'BMW Z4 Convertible 2012',
               'Bentley Continental Supersports Conv. Convertible 2012',
               'Bentley Arnage Sedan 2009',
               'Bentley Mulsanne Sedan 2011',
               'Bentley Continental GT Coupe 2012',
               'Bentley Continental GT Coupe 2007',
               'Bentley Continental Flying Spur Sedan 2007',
               'Bugatti Veyron 16.4 Convertible 2009',
               'Bugatti Veyron 16.4 Coupe 2009',
               'Buick Regal GS 2012',
               'Buick Rainier SUV 2007',
               'Buick Verano Sedan 2012',
               'Buick Enclave SUV 2012',
               'Cadillac CTS-V Sedan 2012',
               'Cadillac SRX SUV 2012',
               'Cadillac Escalade EXT Crew Cab 2007',
               'Chevrolet Silverado 1500 Hybrid Crew Cab 2012',
               'Chevrolet Corvette Convertible 2012',
               'Chevrolet Corvette ZR1 2012',
               'Chevrolet Corvette Ron Fellows Edition Z06 2007',
               'Chevrolet Traverse SUV 2012',
               'Chevrolet Camaro Convertible 2012',
               'Chevrolet HHR SS 2010',
               'Chevrolet Impala Sedan 2007',
               'Chevrolet Tahoe Hybrid SUV 2012',
               'Chevrolet Sonic Sedan 2012',
               'Chevrolet Express Cargo Van 2007',
               'Chevrolet Avalanche Crew Cab 2012',
               'Chevrolet Cobalt SS 2010',
               'Chevrolet Malibu Hybrid Sedan 2010',
               'Chevrolet TrailBlazer SS 2009',
               'Chevrolet Silverado 2500HD Regular Cab 2012',
               'Chevrolet Silverado 1500 Classic Extended Cab 2007',
               'Chevrolet Express Van 2007',
               'Chevrolet Monte Carlo Coupe 2007',
               'Chevrolet Malibu Sedan 2007',
               'Chevrolet Silverado 1500 Extended Cab 2012',
               'Chevrolet Silverado 1500 Regular Cab 2012',
               'Chrysler Aspen SUV 2009',
               'Chrysler Sebring Convertible 2010',
               'Chrysler Town and Country Minivan 2012',
               'Chrysler 300 SRT-8 2010',
               'Chrysler Crossfire Convertible 2008',
               'Chrysler PT Cruiser Convertible 2008',
               'Daewoo Nubira Wagon 2002',
               'Dodge Caliber Wagon 2012',
               'Dodge Caliber Wagon 2007',
               'Dodge Caravan Minivan 1997',
               'Dodge Ram Pickup 3500 Crew Cab 2010',
               'Dodge Ram Pickup 3500 Quad Cab 2009',
               'Dodge Sprinter Cargo Van 2009',
               'Dodge Journey SUV 2012',
               'Dodge Dakota Crew Cab 2010',
               'Dodge Dakota Club Cab 2007',
               'Dodge Magnum Wagon 2008',
               'Dodge Challenger SRT8 2011',
               'Dodge Durango SUV 2012',
               'Dodge Durango SUV 2007',
               'Dodge Charger Sedan 2012',
               'Dodge Charger SRT-8 2009',
               'Eagle Talon Hatchback 1998',
               'FIAT 500 Abarth 2012',
               'FIAT 500 Convertible 2012',
               'Ferrari FF Coupe 2012',
               'Ferrari California Convertible 2012',
               'Ferrari 458 Italia Convertible 2012',
               'Ferrari 458 Italia Coupe 2012',
               'Fisker Karma Sedan 2012',
               'Ford F-450 Super Duty Crew Cab 2012',
               'Ford Mustang Convertible 2007',
               'Ford Freestar Minivan 2007',
               'Ford Expedition EL SUV 2009',
               'Ford Edge SUV 2012',
               'Ford Ranger SuperCab 2011',
               'Ford GT Coupe 2006',
               'Ford F-150 Regular Cab 2012',
               'Ford F-150 Regular Cab 2007',
               'Ford Focus Sedan 2007',
               'Ford E-Series Wagon Van 2012',
               'Ford Fiesta Sedan 2012',
               'GMC Terrain SUV 2012',
               'GMC Savana Van 2012',
               'GMC Yukon Hybrid SUV 2012',
               'GMC Acadia SUV 2012',
               'GMC Canyon Extended Cab 2012',
               'Geo Metro Convertible 1993',
               'HUMMER H3T Crew Cab 2010',
               'HUMMER H2 SUT Crew Cab 2009',
               'Honda Odyssey Minivan 2012',
               'Honda Odyssey Minivan 2007',
               'Honda Accord Coupe 2012',
               'Honda Accord Sedan 2012',
               'Hyundai Veloster Hatchback 2012',
               'Hyundai Santa Fe SUV 2012',
               'Hyundai Tucson SUV 2012',
               'Hyundai Veracruz SUV 2012',
               'Hyundai Sonata Hybrid Sedan 2012',
               'Hyundai Elantra Sedan 2007',
               'Hyundai Accent Sedan 2012',
               'Hyundai Genesis Sedan 2012',
               'Hyundai Sonata Sedan 2012',
               'Hyundai Elantra Touring Hatchback 2012',
               'Hyundai Azera Sedan 2012',
               'Infiniti G Coupe IPL 2012',
               'Infiniti QX56 SUV 2011',
               'Isuzu Ascender SUV 2008',
               'Jaguar XK XKR 2012',
               'Jeep Patriot SUV 2012',
               'Jeep Wrangler SUV 2012',
               'Jeep Liberty SUV 2012',
               'Jeep Grand Cherokee SUV 2012',
               'Jeep Compass SUV 2012',
               'Lamborghini Reventon Coupe 2008',
               'Lamborghini Aventador Coupe 2012',
               'Lamborghini Gallardo LP 570-4 Superleggera 2012',
               'Lamborghini Diablo Coupe 2001',
               'Land Rover Range Rover SUV 2012',
               'Land Rover LR2 SUV 2012',
               'Lincoln Town Car Sedan 2011',
               'MINI Cooper Roadster Convertible 2012',
               'Maybach Landaulet Convertible 2012',
               'Mazda Tribute SUV 2011',
               'McLaren MP4-12C Coupe 2012',
               'Mercedes-Benz 300-Class Convertible 1993',
               'Mercedes-Benz C-Class Sedan 2012',
               'Mercedes-Benz SL-Class Coupe 2009',
               'Mercedes-Benz E-Class Sedan 2012',
               'Mercedes-Benz S-Class Sedan 2012',
               'Mercedes-Benz Sprinter Van 2012',
               'Mitsubishi Lancer Sedan 2012',
               'Nissan Leaf Hatchback 2012',
               'Nissan NV Passenger Van 2012',
               'Nissan Juke Hatchback 2012',
               'Nissan 240SX Coupe 1998',
               'Plymouth Neon Coupe 1999',
               'Porsche Panamera Sedan 2012',
               'Ram C/V Cargo Van Minivan 2012',
               'Rolls-Royce Phantom Drophead Coupe Convertible 2012',
               'Rolls-Royce Ghost Sedan 2012',
               'Rolls-Royce Phantom Sedan 2012',
               'Scion xD Hatchback 2012',
               'Spyker C8 Convertible 2009',
               'Spyker C8 Coupe 2009',
               'Suzuki Aerio Sedan 2007',
               'Suzuki Kizashi Sedan 2012',
               'Suzuki SX4 Hatchback 2012',
               'Suzuki SX4 Sedan 2012',
               'Tesla Model S Sedan 2012',
               'Toyota Sequoia SUV 2012',
               'Toyota Camry Sedan 2012',
               'Toyota Corolla Sedan 2012',
               'Toyota 4Runner SUV 2012',
               'Volkswagen Golf Hatchback 2012',
               'Volkswagen Golf Hatchback 1991',
               'Volkswagen Beetle Hatchback 2012',
               'Volvo C30 Hatchback 2012',
               'Volvo 240 Sedan 1993',
               'Volvo XC90 SUV 2007',
               'smart fortwo Convertible 2012']


def create_model():
    """ Creates an instance of the required PyTorch model and modifies it according to specific changes """

    model = models.resnet34(weights=models.ResNet34_Weights.DEFAULT)
    num_ftrs = model.fc.in_features
    model.fc = torch.nn.Linear(num_ftrs, 196)

    return model


def load_model():
    """ Loads the Pre-trained state_dict of a PyTorch model """

    model = create_model()
    model.load_state_dict(torch.load(MODEL_PATH))

    return model


# Takes in a trained model, class names, image path, image size, a transform and target device
def pred_image(model: torch.nn.Module,
               image: Image,
               class_names=None,
               image_size: Tuple[int, int] = (400, 400),
               transform: transforms = None,
               device: torch.device = "cuda"):
    """Uses a PyTorch model to make a prediction on a given image.

      Passes a given image through a given model's forward function.
      The image is first transformed to the model's specific image transforms

      Args:
        model: A PyTorch model to be trained and tested.
        image: A PIL image.
        class_names: The list of all class names in our dataset (In our case 196 classes).
        image_size: The image size that we want the image to be resized to.
        (By default, the model was trained and tested on 400x400 images)

        transform: A PyTorch transform for images (By default is None, we use the transforms the model
        was trained and tested on).
        device: A target device to compute on (e.g. "cuda" or "cpu", "cuda" is by default).

      Returns:
        A List containing the model's top1 prediction alongside its prediction accuracy,
        and a list that has the class labels of the model's top3 predictions on the image.

        In the form: [Top1 prediction class, Top1 prediction accuracy, [Top3 pred labels]]

        For example, given an image of a: BMW 6 Series Convertible 2007
                     [BMW 6 Series Convertible 2007, 99.53032,
                            [BMW 6 Series Convertible 2007,
                             BMW M6 Convertible 2010,
                             Chrysler Sebring Convertible 2010]]
    """

    # Create transformation for image (if one doesn't exist)
    if class_names is None:
        class_names = CLASS_NAMES

    if transform is not None:
        image_transform = transform
    else:
        image_transform = transforms.Compose([transforms.Resize(image_size),
                                              transforms.ToTensor(),
                                              transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])

    # Make sure the model is on the target device
    model.to(device)

    # Turn on model evaluation mode and inference mode
    model.eval()
    with torch.inference_mode():
        # Transform and add an extra dimension to image (model requires samples in [batch_size, color_channels, height, width])
        transformed_image = image_transform(image).unsqueeze(dim=0)

        # Make a prediction on image with an extra dimension and send it to the target device
        target_image_pred = model(transformed_image.to(device))

    # Convert logits to prediction probabilities (using torch.softmax() for multi-class classification)
    target_image_pred_probs = torch.softmax(target_image_pred, dim=1)

    # Finds the index of the highest probability value (Top1 pred)
    target_image_pred_label = torch.argmax(target_image_pred_probs, dim=1)

    # Finds the indices of the top 3 predictions
    top3_preds = torch.topk(target_image_pred_probs, k=3, dim=1).indices

    # Convert top 3 predictions from tensor to list
    top3_preds = torch.squeeze(top3_preds).tolist()

    # Get top 3 class names
    top3_class_preds = []
    for pred in top3_preds:
        top3_class_preds.append(class_names[pred])

    # Shows top1 accuracy
    # print(f"Pred: {class_names[target_image_pred_label]} | Prob: {target_image_pred_probs.max():.3f}")

    # Returns the Top1 prediction (Class name predicted and probability), and the Top3 prediction labels
    return class_names[target_image_pred_label], target_image_pred_probs.max().item(), top3_class_preds


def model_prediction(image: Image):
    """ Loads a specified PyTorch model and calls pred_image() method on a given image for that model """

    model = load_model()
    predicted_model, prediction_acc, top3 = pred_image(model=model, image=image)

    return predicted_model, prediction_acc, top3


def get_class_names():
    """ Returns the list of available class names"""
    return CLASS_NAMES
