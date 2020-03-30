import tensorflow as tf
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
from flask import Flask, request, jsonify, render_template, url_for, redirect
import urllib

# Normalize data
def preprocess_image(img):
  img = img.astype('float32')
  img = img / 255
  img = img.reshape((1, 28, 28, 1))
  return img

# Load model
model = load_model('mnist_cnn_data_augmented.h5')
max_prob = 0
predicticted_num = 0

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    response = urllib.request.urlopen(data)
    with open('image.jpeg', 'wb') as f:
        f.write(response.file.read())
    img = cv2.imread('image.jpeg', cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, dsize=(28, 28), interpolation=cv2.INTER_AREA)
    img = preprocess_image(img)
    prediction = model.predict(img)
    max_prob = np.amax(prediction)
    predicticted_num = np.argmax(prediction)
    return jsonify(str(max_prob), str(predicticted_num), str(prediction))

@app.route('/modelsummary', methods=['GET'])
def modelsummary():
    return render_template('modelsummary.html')

if __name__ == "__main__":
    app.run(debug=True)
