from flask import jsonify,Blueprint,request
from datetime import datetime
from app import db
from app.models.transactions import Transaction
transactions_bp=Blueprint("transactions",__name__)
@transactions_bp.route("/",methods=["GET"])
def get_transactions():
    transactions =Transaction.query.all()
    result=[]
    for t in transactions :
        result.append({
            "id": t.id,
            "amount": t.amount,
            "type": t.type,
            "category": t.categorie,
            "description": t.description,
            "date": t.date
        })
    return jsonify({"status":"suceess" , "transactions":result })
@transactions_bp.route("/",methods=["POST"])

def add_transaction():
    data=request.get_json()
    new_transaction=Transaction(
        amount=data["amount"],
        type=data["type"],
        categorie=data["category"],
        description=data["description"],
        date=datetime.utcnow()
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({"status":"success","message":"Transaction added"})


