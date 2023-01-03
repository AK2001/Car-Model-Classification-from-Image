import random
import time

carList = ["Nissan", "Mitsubishi", "Chevrolet", "Subaru", "Mazda", "Ford"]

def stupid_prediction():
    time.sleep(4)
    return random.choice(carList), random.randint(50,100)