from flask import Flask
app = Flask(__name__)

app.route('/' , methods=['GET'])
def func():
    return "<p>Hello World</p>"
