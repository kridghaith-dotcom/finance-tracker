from app import db
class Transaction(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    amount=db.Column(db.Float)
    date=db.Column(db.DateTime)
    type=db.Column(db.String)
    description=db.Column(db.String)
    categorie=db.Column(db.String)