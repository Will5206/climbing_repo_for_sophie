from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__, template_folder='public/templates', static_folder='public/static')


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/board')
def board():
    return render_template('board.html')

@app.route('/contact-us')
def contact():
    return render_template('contact.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/create-account')
def create_account():
    return render_template('create-account.html')


if __name__ == "__main__":
    app.run(debug=True)
