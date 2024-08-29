from package import db
from flask_login import UserMixin
from package import loginManager

from datetime import datetime
@loginManager.user_loader
def load_user(id):
    # print("Load user loading", int(id))
    return User.query.get(int(id))

# User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    gender = db.Column(db.String(30), nullable=False)
    profile_pic = db.Column(db.String(30), nullable=True)
    role = db.Column(db.String(20), default="adopter")
    pets = db.relationship('Pet', backref='adopter', lazy=True)

    adoptions = db.relationship('Adoption', backref='adopter', lazy=True)

    # Relationship to messages
    # messages = db.relationship('Message', backref='sender', lazy=True)
    
    # Relationships to conversations as participant 1 and participant 2
    # conversations_as_participant1 = db.relationship('Conversation', foreign_keys='Conversation.user1_id', backref='participant1', lazy=True)
    # conversations_as_participant2 = db.relationship('Conversation', foreign_keys='Conversation.user2_id', backref='participant2', lazy=True)
    # def to_json(self):
    #     return {
    #         "id": self.id,
    #         "username": self.username,
    #         "password": self.password,
    #         "gender": self.gender,
    #         "fullName": self.full_name
    #     }

# Conversation model
# class Conversation(db.Model):
#     _id = db.Column(db.Integer, primary_key=True)
    
#     # Foreign keys to link to the two users involved in the conversation
#     user1_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     user2_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
#     # Relationship to messages in this conversation
#     messages = db.relationship('Message', backref='conversation', lazy=True)

# # Message model
# class Message(db.Model):
#     _id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.Text, nullable=False)
    
#     # Foreign key to the user who sent the message
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
#     # Foreign key to the conversation in which the message was sent
#     conversation_id = db.Column(db.Integer, db.ForeignKey('conversation._id'), nullable=False)


# Pet model
class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pet_type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    age_months = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    weight_kg = db.Column(db.Float, nullable=False)
    vaccinated = db.Column(db.Boolean, nullable=False)
    health_condition = db.Column(db.Boolean, nullable=False)
    time_in_shelter_days = db.Column(db.Integer, nullable=False)
    adoption_fee = db.Column(db.Float, nullable=False)
    previous_owner = db.Column(db.Boolean, nullable=False)
    adoption_likelihood = db.Column(db.Boolean, nullable=False)

    adopter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    adoptions = db.relationship('Adoption', backref='pet', lazy=True)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'), nullable=True)

class Adoption(db.Model):    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    adoption_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default="in_progress")  # 'in progress', 'completed'


class Shelter(db.Model):
    __tablename__ = 'shelters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    website = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)

    # Relationships
    pets = db.relationship('Pet', backref='shelter', lazy=True)