from flask import Flask, request, jsonify, send_from_directory
import pickle
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)

# Load the model and vectorizer
with open('spam_classifier.pkl', 'rb') as file:
    model = pickle.load(file)

with open('vectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'No email provided'}), 400
    
    # Preprocess the email
    email_features = vectorizer.transform([email])
    prediction = model.predict(email_features)[0]
    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
