from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User

from app.schemas.incident import (
    IncidentCreate,
    IncidentResponse,
)
from app.incidents.service import (
    create_incident,
    get_all_incidents,
)


router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"],
)

@router.post(
    "",
    response_model=IncidentResponse,
)
def create_incident_route(
    incident_data: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_incident(
        db,
        incident_data,
        current_user.id,
    )

@router.get(
    "",
    response_model=list[IncidentResponse],
)
def get_incidents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all_incidents(db)