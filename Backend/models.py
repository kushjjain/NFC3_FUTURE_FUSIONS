from package import db
from flask_login import UserMixin
from package import loginManager


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
