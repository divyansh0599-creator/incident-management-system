from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate


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