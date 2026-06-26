from fastapi import HTTPException
from app.models.user import User
from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate


def create_incident(
    db: Session,
    incident_data: IncidentCreate,
    user_id: int,
):
    incident = Incident(
        title=incident_data.title,
        description=incident_data.description,
        priority=incident_data.priority,
        created_by_id=user_id,
    )

    db.add(incident)

    db.commit()

    db.refresh(incident)

    return incident

def get_all_incidents(
    db: Session,
):
    return (
        db.query(Incident)
        .order_by(Incident.created_at.desc())
        .all()
    )

def get_incident_by_id(
    db: Session,
    incident_id: int,
):
    return (
        db.query(Incident)
        .filter(
            Incident.id == incident_id
        )
        .first()
    )


def update_incident(
    db: Session,
    incident_id: int,
    update_data: IncidentUpdate,
    current_user: User,
):
    incident = (
        db.query(Incident)
        .filter(
            Incident.id == incident_id
        )
        .first()
    )

    if not incident:
        return None

    # Everyone can update status
    incident.status = update_data.status

    # Only Admin/Manager can assign incidents
    if "assigned_to_id" in update_data.model_fields_set:
        if current_user.role not in [
            "Admin",
            "Manager",
        ]:
            raise HTTPException(
                status_code=403,
                detail="You cannot assign incidents",
            )

        incident.assigned_to_id = update_data.assigned_to_id

    db.commit()
    db.refresh(incident)

    return incident
