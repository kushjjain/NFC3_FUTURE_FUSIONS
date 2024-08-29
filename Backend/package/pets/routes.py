from flask import Blueprint, request, jsonify
from ..models import Pet  # Assuming the Pet model is defined in the main models.py file

pets_bp = Blueprint('pets', __name__)

@pets_bp.route('/search', methods=['POST'])
def search():
    data = request.json
    search_query = data.get('query', '')

    results = Pet.query.filter(
        (Pet.pet_type.ilike(f'%{search_query}%')) | 
        (Pet.breed.ilike(f'%{search_query}%'))
    ).all()

    if results:
        pets = []
        for pet in results:
            pets.append({
                'id': pet.id,
                'pet_type': pet.pet_type,
                'breed': pet.breed,
                'age_months': pet.age_months,
                'color': pet.color,
                'size': pet.size,
                'weight_kg': pet.weight_kg,
                'vaccinated': pet.vaccinated,
                'health_condition': pet.health_condition,
                'time_in_shelter_days': pet.time_in_shelter_days,
                'adoption_fee': pet.adoption_fee,
                'previous_owner': pet.previous_owner,
                'adoption_likelihood': pet.adoption_likelihood
            })
        return jsonify(pets=pets), 200
    else:
        return jsonify(message="No pets found matching your search criteria."), 404
