from flask import Flask , jsonify
from app.routes.transactions import transactions_bp
app =Flask(__name__)
app.register_blueprint(transactions_bp,url_prefix="/api/transactions")
@app.route("/")
def home():
    return "hello"

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
)
