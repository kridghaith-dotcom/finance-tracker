from flask import jsonify,Blueprint
transactions_bp=Blueprint("transactions",__name__)
@transactions_bp.route("/")
def get_transactions():
    return jsonify({"status":"suceess" , "transactions":[] })