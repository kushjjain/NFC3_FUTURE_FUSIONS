from flask import Blueprint, request, jsonify
from models import Pet  
from models import Shelter
# from flask_login import login_required
pets_bp = Blueprint('pets', __name__)

@pets_bp.route('/search', methods=['POST'])
def search():
    search_query = request.args.get('query', '')

    results = Pet.query.filter(
        (Pet.pet_type.ilike(f'%{search_query}%')) | 
        (Pet.breed.ilike(f'%{search_query}%'))
    ).all()

    if results:
        pets = []
        for pet in results:
            pets.append(   {
        "imageUrl": pet.image_url,
        'id': pet.id, 
        'type': pet.pet_type, 
        'breed': pet.breed, 
        'age': pet.age_months,
        'color': pet.color,
        # 'Size': pet.size,
        # 'WeightKg': pet.weight_kg,
        # 'Vaccinated': pet.vaccinated,
        # 'HealthCondition': pet.health_condition,
        # 'TimeInShelterDays': pet.time_in_shelter_days,
        # 'AdoptionFee': pet.adoption_fee,
        # 'PreviousOwner': pet.previous_owner,
        'adoption_likelihood': pet.adoption_likelihood,
        # "vaccinationCertificate": pet.vaccinationCertificate
    })
        return jsonify(pets=pets), 200
    else:
        return jsonify(message="No pets found matching your search criteria."), 404


# All pets

@pets_bp.route('/all-pets', methods=['GET'])
# @login_required
def list_pets():
    pets = Pet.query.order_by(Pet.adoption_likelihood.desc(), Pet.age_months).all()
    pets_list = [{'id': pet.id, 'type': pet.pet_type, 'breed': pet.breed, 'age': pet.age_months, 'imageUrl': pet.image_url, "color": pet.color, "adoption_likelihood": pet.adoption_likelihood, "previousOwner": pet.previous_owner, "shelter_id":pet.shelter_id} for pet in pets]
    return jsonify(pets_list)



# View Pet Details
@pets_bp.route('/<int:pet_id>', methods=['GET'])
def view_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    shelter1 = Shelter.query.get(pet.shelter.id)
    print(pet, shelter1)
    pet_details = {
        "profilePicture": pet.image_url,
        'id': pet.id, 
        'PetType': pet.pet_type, 
        'Breed': pet.breed, 
        'AgeMonths': pet.age_months,
        'Color': pet.color,
        'Size': pet.size,
        'WeightKg': pet.weight_kg,
        'Vaccinated': pet.vaccinated,
        'HealthCondition': pet.health_condition,
        'TimeInShelterDays': pet.time_in_shelter_days,
        'AdoptionFee': pet.adoption_fee,
        'PreviousOwner': pet.previous_owner,
        'PreviousOwnerName': pet.previous_owner_name,
        'adoption_likelihood': pet.adoption_likelihood,
        "vaccinationCertificate": pet.vaccinationCertificate,
        "shelter_id": pet.shelter.id,
        "shelter_location": pet.shelter.city,
        "shelter_address": pet.shelter.address,
        "shelter_state": pet.shelter.state,
        "shelter_phone_number": pet.shelter.phone_number
    }
    return jsonify(pet_details)


