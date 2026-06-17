from pydantic import BaseModel

from app.models.incident import (
    PriorityEnum,
    StatusEnum,
)

class IncidentCreate(BaseModel):
    title: str
    description: str
    priority: PriorityEnum

class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: PriorityEnum
    status: StatusEnum

    created_by_id: int
    assigned_to_id: int | None

    class Config:
        from_attributes = True

class IncidentUpdate(BaseModel):
    status: StatusEnum
    assigned_to_id: int | None = None