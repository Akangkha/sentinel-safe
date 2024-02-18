import cv2
import numpy as np
import requests


url = 'https://sentinel-safe-backend.vercel.app/'
# r = requests.get(url)

def is_light_or_dark(image_path, threshold=0.5, mode="average"):
    
    img = cv2.imread(image_path)
    if img is None:
        return False
    
    if len(img.shape) > 2:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    if mode == "average":
        brightness = np.mean(img) / 255
    elif mode == "luma":
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        l, _, _ = cv2.split(lab)
        brightness = np.mean(l) / 255
    elif mode == "contrast":
        brightness = np.std(img) / 255
    else:
        raise ValueError(f"Invalid mode: {mode}. Valid options are 'average', 'luma', 'contrast'.")

    return brightness < threshold



# Example usage:
image_path = r"../resource/night-photo.png"
threshold = 0.4
mode = "average"

# is_light_or_dark is a function
is_dark = is_light_or_dark(image_path, threshold, mode)
print(is_dark)

post = requests.post(url, json= {"Brightness" : bool(is_dark)})
# print(post.json())