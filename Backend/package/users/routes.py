from flask import Blueprint, jsonify, request
from models import User, Pet
from package import db, bcrypt
from flask_login import current_user, login_user, logout_user, login_required
user_bp = Blueprint('users', __name__)
@user_bp.route("/", methods=["GET"])
def home():
    return "Hi"

@user_bp.route("/api/auth/signup", methods=["POST"])
def sign_up():
    try:
        data = request.json
        print(data)
        username = data.get("username")
        print(username)
        user = User.query.filter_by(username=username).first()
        if user is None:
            hashed_pwd = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
            new_user = User(username=data["username"], full_name=data["fullName"], password=hashed_pwd, gender=data["gender"], profile_pic = data.get("profilePic") or None)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "User added successfully"}), 200
        else:
            return jsonify({"error": "Username exists already"}), 409
    except Exception:
        print(Exception)
        return jsonify({"error", "Something went wrong"}), 500


@user_bp.route("/api/auth/user/login", methods=["POST"])
def login():
    data = request.json
    print(data)
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username, role="user").first()
    if user is None:
        return jsonify({"error": "No such user exists"}), 401
    if bcrypt.check_password_hash(user.password,password):
        print(user.id)
        login_user(user)
        print(current_user.username)
        return jsonify({"message": "Login Successful"}), 200
    return jsonify({"error": "Invalid Credentials"}), 401

@user_bp.route("/api/auth/admin/login", methods=["POST"])
def login_admin():
    data = request.json
    print(data)
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username, role="admin").first()
    if user is None:
        return jsonify({"error": "No such user exists"}), 401
    if bcrypt.check_password_hash(user.password,password):
        print(user.id)
        login_user(user)
        print(current_user.username)
        return jsonify({"message": "Login Successful"}), 200
    return jsonify({"error": "Invalid Credentials"}), 401

@user_bp.route("/api/auth/logout", methods=["POST"])
def logout():
    logout_user()
    return jsonify({"message": "ok"}), 200

@user_bp.route("/api/admin/register-admin", methods=["POST"])
def sign_up_admin():
    try:
        data = request.json
        print(data)
        username = data.get("username")
        print(username)
        user = User.query.filter_by(username=username).first()
        if user is None:
            hashed_pwd = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
            new_user = User(username=data["username"], full_name=data["fullName"], password=hashed_pwd, gender=data["gender"], profile_pic = data.get("profilePic") or None, role="admin")
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "User added successfully"}), 200
        else:
            return jsonify({"error": "Username exists already"}), 409
    except Exception:
        print(Exception)
        return jsonify({"error", "Something went wrong"}), 500

@user_bp.route("/api/admin/distribution-data", methods=["GET"])
@login_required
def get_admin_distribution_data():
    if current_user.role=="adopter":
        return jsonify({"error": "Not an admin user"})
    pets_1 = Pet.query.filter_by(adoption_likelihood=1).all()
    pets_0 = Pet.query.filter_by(adoption_likelihood=0).all()
    print(len(pets_1))
    return jsonify({
    "labels": ['Likely', 'Unlikely'],
    "data": [len(pets_1), len(pets_0)],
  })


@user_bp.route("/api/admin/feature_data", methods=["GET"])
@login_required
def get_admin_feature_data():
    print(current_user)
    if current_user.role=="adopter":
        return jsonify({"error": "Not an admin user"})
    # Define the attributes you want to filter by
    attributes = {
        'breed': ['Labrador', 'Golden Retriever', 'Persian', 'Siamese', 'Poodle', "Parakeet", "Rabbit"],
        'size': ['Small', 'Medium', 'Large'],
        "pet_type": ["Rabbit", "Dog", "Bird", "Cat"],
        "color": ['Black', 'White', 'Brown', 'Golden'],
        "vaccinated": [True, False],
        "health_condition": [True, False],
        "previous_owner": [True, False]
    }
    
    # Prepare the result dictionary
    result = {
        'labels': [],
        'data': []
    }
    
    # Query for each attribute
    for attribute, values in attributes.items():
        for value in values:
            count_likely = Pet.query.filter_by(adoption_likelihood=True, **{attribute: value}).count()
            count_unlikely = Pet.query.filter_by(adoption_likelihood=False, **{attribute: value}).count()
            
            result['labels'].append(f'{attribute} {value} Likely')
            result['labels'].append(f'{attribute} {value} Unlikely')
            result['data'].append(count_likely)
            result['data'].append(count_unlikely)
    
    return jsonify({"result": result})
# @routes_bp.route("/api/new-conversation/<int:user_id>", methods=["POST"])
# @login_required
# def new_conversation(user_id):
#     user1 = current_user.id
#     user2 = User.query.get(user_id)
#     if user2 is None:
#         return jsonify({"error": "No such user exists"})
#     existing_conv = Conversation.query.filter_by(user1_id=user1, user2_id=user_id).first()
#     inv_existing_conv = Conversation.query.filter_by(user2_id=user1, user1_id=user_id).first()
#     if existing_conv or inv_existing_conv:
#         return jsonify({"error": "Conversation already exists"})
#     new_conv = Conversation(user1_id=user1, user2_id=user_id)
#     db.session.add(new_conv)
#     db.session.commit()
#     return jsonify({"message": "conversation created successfully"})
    
# @routes_bp.route("/api/users/<int:user_id>", methods=["GET"])
# @login_required
# def user_conversations(user_id):
#     # Query the user by their ID
#     user = User.query.get(user_id)
    
#     if not user:
#         return "User not found", 404
    
#     # Access the user's conversations
#     user_conversations = user.conversations
#     print(user_conversations[0].messages[0].message)
#     # Format the response (e.g., as a list of conversation topics)
#     conversation_list = [{"id": convo._id, "messages": [x.message for x in convo.messages]} for convo in user_conversations]
    
#     return jsonify({"user_id": [user_id, ], "conversations": conversation_list}), 200


# @routes_bp.route("/api/message/<int:conversation_id>", methods=["POST"])
# @login_required
# def new_message(conversation_id):
#     inp = request.json.get("input")
#     if inp is None:
#         return jsonify({"error": "Empty Message"}), 406
#     conv = Conversation.query.get(conversation_id)
#     if conv is None:
#         return jsonify({"error": "Conversation doesn't exist"}), 402
#     message = Message(content=inp, user_id=current_user.id, conversation_id=conversation_id)
#     db.session.add(message)
#     db.session.commit()

#     return jsonify({"msg": "Message sent"}), 200

# @routes_bp.route("/api/get-messages/<int:conversation_id>", methods=["GET"])
# @login_required
# def get_messages(conversation_id):
#     conv = Conversation.query.get(conversation_id)
#     if conv is None:
#         return jsonify({"error": "Conversation doesn't exist cannot get messages"}), 402
    
#     all_msgs = []
#     for message in conv.messages:
#         dic ={"content": message.content, "userId": message.user_id}
#         all_msgs.append(dic)
#         print(message)

#     return jsonify({"msg": all_msgs}), 200

# @routes_bp.route("/api/tp", methods=["GET"])
# def all_convo_test():
#     conv = Conversation.query.all()
#     res=[con.to_json() for con in conv]
#     return jsonify(res),200

