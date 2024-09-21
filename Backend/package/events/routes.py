from models import Event, Shelter, User
from flask import Blueprint, jsonify, request
from datetime import datetime
from package import db
events_bp = Blueprint("events", __name__)

@events_bp.route("/all", methods=["GET"])
def get_all_events():
    events = Event.query.all()
    events = [event.to_dict() for event in events]
    return jsonify(events)

@events_bp.route("/add", methods=["POST"])
def add_event():
    data = request.json
    d1 = data.get("name")
    d2 = data.get("datetime")
    d3 = data.get("address")
    if (d1 or d2 or d3) is None:
        return jsonify({"err": "Fields required"})
    
    event_datetime = datetime.fromisoformat(d2)

    new_event = Event(name=d1, datetime=event_datetime, address=d3, description=data.get("description"))
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"msg": "Event added successfully"})

@events_bp.route("/delete/<int:id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.get(id)
    if event is None:
        return jsonify({"error": "No such event"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "Event deleted successfully"})