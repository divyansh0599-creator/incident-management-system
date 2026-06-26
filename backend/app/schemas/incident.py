from pydantic import BaseModel

from app.models.incident import (
    PriorityEnum,
    StatusEnum,
)

class IncidentCreate(BaseModel):
    title: str
    description: str
    priority: PriorityEnum

class AssignedUserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str

    class Config:
        from_attributes = True

class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: PriorityEnum
    status: StatusEnum

    created_by_id: int
    assigned_to_id: int | None
    assigned_to: AssignedUserResponse | None = None

    class Config:
        from_attributes = True

class IncidentUpdate(BaseModel):
    status: StatusEnum
    assigned_to_id: int | None = None
