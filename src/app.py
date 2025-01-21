from flask import Flask, render_template

app = Flask(__name__)

# tic-tac-toe page
@app.route("/")
def home():
    return render_template('ttt.j2', page_name='ttt')

@app.route("/api/ttt", methods=['GET', 'POST'])
def apiTTT():
    return render_template()


if __name__ == "__main__":        
    app.run(debug= True)
