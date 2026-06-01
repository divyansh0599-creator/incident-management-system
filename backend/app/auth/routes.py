from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.auth.services import create_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    user = create_user(db, user_data)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    return user