from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User

from app.schemas.incident import (
    IncidentAssignRequest,
    IncidentCreate,
    IncidentResponse,
    IncidentStatusUpdate,
)
from app.incidents.service import (
    create_incident,
    get_all_incidents,
    get_incident_by_id,
    update_incident_status,
    assign_incident,
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

@router.get(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident

@router.patch(
    "/{incident_id}/status",
    response_model=IncidentResponse,
)
def update_status(
    incident_id: int,
    status_data: IncidentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = update_incident_status(
        db,
        incident_id,
        status_data.status,
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident

@router.patch(
    "/{incident_id}/assign",
    response_model=IncidentResponse,
)
def assign_incident_route(
    incident_id: int,
    assign_data: IncidentAssignRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = assign_incident(
        db,
        incident_id,
        assign_data.assigned_to_id,
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident or user not found",
        )

    return incident