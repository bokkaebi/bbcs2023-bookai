from flask import Flask, request, render_template, render_template_string
from pathlib import Path
import tensorflow as tf

CWD = Path(__file__).parent.resolve()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    return render_template('bot.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')


# Problems to solve:
# search up more about flask lmao
# 1. css not working
# 2. links of buttons

app.run(debug=True, port=5001)