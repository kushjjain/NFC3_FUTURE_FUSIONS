from flask import Blueprint, request, jsonify
from models import Pet  
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


# All pets
@pets_bp.route('/all-pets', methods=['GET'])
def list_pets():
    pets = Pet.query.all()
    pets_list = [{'id': pet.id, 'type': pet.pet_type, 'breed': pet.breed, 'age': pet.age_months, 'imageUrl': pet.image_url, "color": pet.color} for pet in pets]
    return jsonify(pets_list)



# View Pet Details
@pets_bp.route('/<int:pet_id>', methods=['GET'])
def view_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    pet_details = {
        'id': pet.id, 
        'type': pet.pet_type, 
        'breed': pet.breed, 
        'age': pet.age_months,
        'color': pet.color,
        'size': pet.size,
        'weight': pet.weight_kg,
        'vaccinated': pet.vaccinated,
        'health_condition': pet.health_condition,
        'time_in_shelter': pet.time_in_shelter_days,
        'adoption_fee': pet.adoption_fee,
        'previous_owner': pet.previous_owner,
        'adoption_likelihood': pet.adoption_likelihood
    }
    return jsonify(pet_details)


