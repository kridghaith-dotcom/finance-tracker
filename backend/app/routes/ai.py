import anthropic
import os
from flask import jsonify,Blueprint,request
from flask_cors import cross_origin
from app.models.transactions import Transaction

ai_bp=Blueprint("ai",__name__)
@ai_bp.route("/",methods=["POST"])
def aiReponse():
    data=request.get_json()
    question=data["question"]
    transactions=Transaction.query.all()
    transactions_text="\n".join([
        f"- {t.description}, {t.category}, {t.amount}DT, {t.type}"
        for t in transactions
    ])
    client=anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1000,
    messages=[{
        "role": "user",
        "content": f"Here are my transactions:\n{transactions_text}\n\nQuestion: {question}"
    }])
    
    answer = message.content[0].text
    return jsonify({"answer": answer})
    