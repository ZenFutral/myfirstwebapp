from flask import Flask, render_template

app = Flask(__name__)

# tic-tac-toe page
@app.route("/ttt")
def ttt():
    return render_template('ttt.j2', page_name='ttt')

@app.route("/pong")
def pong():
    return render_template('pong.j2', page_name='pong')



if __name__ == "__main__":        
    app.run(debug= True)
