import csv
from flask import Flask, request, render_template, render_template_string
from pathlib import Path
from flask.json import jsonify
# import tensorflow as tf
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity

CWD = Path(__file__).parent.resolve()

app = Flask(__name__)

data = pd.read_csv("./data/goodreads_data.csv").drop("Unnamed: 0", axis=1)
data = data.dropna()
data = data.drop_duplicates()
embeddings = np.load('data/embeddings.npy')
def get_recommendations(book_id, similarity_matrix, k):
    similar_books = list(enumerate(similarity_matrix[int(book_id)]))
    similar_books = sorted(similar_books, key=lambda x: x[1], reverse=True)
    similar_books = similar_books[1:k+1]
    recommended_books = [{"title": data.iloc[i[0]]["Book"], "author": data.iloc[i[0]]["Author"], "description": data.iloc[i[0]]["Description"], "link": data.iloc[i[0]]["URL"]} for i in similar_books]
    return recommended_books
cos_sim = util.cos_sim(embeddings, embeddings)


@app.route('/', methods=['GET'])
def main():
    return render_template('bot.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/recommend', methods=['GET'])
def recommend():
    bookid = request.args.get("book_id")
    k = request.args.get("k")

    results = get_recommendations(int(bookid), cos_sim, int(k))

    return {
        "recommendations": results
    }

@app.route('/get_csv_data', methods=['GET'])
def get_csv_data():
    csv_file_path = 'data/goodreads_data.csv'
    
    with open(csv_file_path, 'r', encoding='utf-8-sig') as file:
        csv_reader = csv.reader(file)
        first_column_values = [row[1] for row in csv_reader]

    return jsonify(books=first_column_values[1:])


app.run(debug=True)