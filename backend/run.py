from dotenv import load_dotenv
load_dotenv()
from app.routes.transactions import transactions_bp
from app.routes.ai import ai_bp
from app import create_app


app =create_app()
app.register_blueprint(transactions_bp,url_prefix="/api/transactions")
app.register_blueprint(ai_bp, url_prefix="/api/ai")

@app.route("/")
def home():
    return "hello"

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
)
