from flask import Flask, request, render_template, render_template_string
from pathlib import Path
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
def get_recommendations(book_id, similarity_matrix, k=5):
    similar_books = list(enumerate(similarity_matrix[int(book_id)]))
    similar_books = sorted(similar_books, key=lambda x: x[1], reverse=True)
    similar_books = similar_books[1:k+1]
    recommended_books = [{"title": data.iloc[i[0]]["Book"], "author": data.iloc[i[0]]["Author"]} for i in similar_books]
    return recommended_books
cos_sim = util.cos_sim(embeddings, embeddings)


@app.route('/', methods=['GET'])
def main():
    return render_template('bot.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/recommend', methods=['GET'])
def recomment():
    bookid = request.args.get("book_id")

    results = get_recommendations(int(bookid), cos_sim)

    return {
        "recommendations": results
    }


app.run(debug=True, port=5000)