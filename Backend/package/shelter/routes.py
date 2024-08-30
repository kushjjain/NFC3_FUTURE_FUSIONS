from flask import request,jsonify, Blueprint
from models import db,Pet,Shelter

shelter_bp = Blueprint("shelter", __name__)


@shelter_bp.route('/pets', methods=['GET'])
def get_all_pets():
    pets = Pet.query.all()
    pets_list = [{
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
    } for pet in pets]

    return jsonify(pets=pets_list), 200


@shelter_bp.route('/pets/add', methods=['POST'])
def add_pet():
    data=request.json
    print(data)
    new_pet=Pet(
        pet_type=data['pet_type'],
        breed=data['breed'],
        age_months=data['age_months'],
        color=data['color'],
        size=data['size'],
        weight_kg=data['weight_kg'],
        vaccinationCertificate=data['vaccinationCertificate'],
        health_condition=data['health_condition'],
        time_in_shelter_days=data['time_in_shelter_days'],
        adoption_fee=data['adoption_fee'],
        previous_owner= True,
        vaccinated=True,
        previous_owner_name=data['previous_owner_name'],
        adoption_likelihood=data['adoption_likelihood'],
        image_url = data["profilePicture"]
    )

    db.session.add(new_pet)
    db.session.commit()

    return jsonify (message="New Pet added Successfully!"),201

@shelter_bp.route('/pets/edit/<int:pet_id>', methods=['PUT'])
def edit_bp(pet_id):
        data =request.json
        pet=Pet.query.get_or_404(pet_id)
        pet.pet_type=data['pet_type',pet.pet_type],
        pet.breed=data['breed',pet.breed],
        pet.age_months=data['age_months',pet.age_months],
        pet.color=data['color',pet.color],
        pet.size=data['size',pet.size],
        pet.weight_kg=data['weight_kg',pet.weight_kg],
        pet.vaccinated=data['vaccinated',pet.vaccinated],
        pet.health_condition=data['health_condition',pet.health_condition],
        pet.time_in_shelter_days=data['time_in_shelter_days',pet.time_in_shelter_days],
        pet.adoption_fee=data['adoption_fee',pet.adoption_fee],
        pet.previous_owner=data['previous_owner',pet.previous_owner],
        pet.adoption_likelihood=data['adoption_likelihood',pet.adoption_likelihood]
    
        db.session.commit()

        return jsonify(message="Pet Details updated Successfully!"),200

@shelter_bp.route('/pets/delete/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    pet=Pet.query.get_or_404(pet_id)
    db.session.delete(pet)
    db.session.commit()

    return jsonify(message="Pet Deleted Successfully"),200


# Get shelters by city
@shelter_bp.route('/shelters', methods=['GET'])
def get_shelters_by_city():
    city = request.args.get('city')
    if not city:
        return jsonify(message="City parameter is required."), 400

    shelters = Shelter.query.filter_by(city=city).all()
    shelters_list = [{
        'id': shelter.id,
        'name': shelter.name,
        'address': shelter.address,
        'city': shelter.city,
        'state': shelter.state,
        'phone_number': shelter.phone_number,
        'email': shelter.email,
        'website': shelter.website,
        'description': shelter.description
    } for shelter in shelters]

    if shelters_list:
        return jsonify(shelters=shelters_list), 200
    else:
        return jsonify(message="No shelters found in the specified city."), 404
    
@shelter_bp.route('/shelters/add', methods=['POST'])
def add_shelter():
    data = request.json
    required_fields = ['name', 'address', 'city', 'state', 'phone_number']

    # Validate required fields
    for field in required_fields:
        if field not in data:
            return jsonify(message=f"Field '{field}' is required."), 400

    new_shelter = Shelter(
        name=data['name'],
        address=data['address'],
        city=data['city'],
        state=data['state'],
        phone_number=data['phone_number'],
        email=data.get('email'),  
        website=data.get('website'),  
        description=data.get('description')  
    )

    db.session.add(new_shelter)
    db.session.commit()

    return jsonify(message="New Shelter added successfully!"), 201