# Adopt a pet
from models import Pet, Adoption, User 
# from flask_login import login_required, current_user
from flask import Blueprint, request, jsonify, session
from package import db
from datetime import datetime

adopt_bp = Blueprint('adopt', __name__)
@adopt_bp.route('/adopt/<int:pet_id>', methods=['POST'])
# @login_required
def adopt_pet(pet_id):
    u_id = session["user_id"]
    user = User.query.get(u_id)
    if user is None:
        return jsonify({"message: Login First"})
    pet = Pet.query.get_or_404(pet_id)
    if pet.adopter_id:
        return jsonify({'message': 'Pet is already adopted!'}), 400
    
    pet.adopter_id = session["user_id"]
    adoption = Adoption(user_id=session["user_id"], pet_id=pet.id, adoption_date=datetime.utcnow(), status='in progress')
    db.session.add(adoption)
    db.session.commit()
    return jsonify({'message': 'Pet adopted successfully!'})

@adopt_bp.route('/my-adopted-pets', methods=["GET"])

def get_pets_adopted_by_user():
    u_id = session["user_id"]
    user = User.query.get(u_id)
    if user is None:
        return jsonify({"message: Login First"})
    adoptions = Adoption.query.filter_by(user_id=user.id).all()
    adoption_list = [{'pet_id': adoption.pet_id, 'adoption_date': adoption.adoption_date, 'status': adoption.status} for adoption in adoptions]
    return jsonify({"adoption_list": adoption_list})