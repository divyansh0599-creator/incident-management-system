from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.services import create_user, authenticate_user, get_all_users
from app.schemas.user import (
    UserCreate,
    UserListResponse,
    UserResponse,
    UserLogin,
    Token,
)
from app.auth.dependencies import get_current_user
from app.models.user import User


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

@router.post(
    "/login",
    response_model=Token,
)
def login_user(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    token = authenticate_user(
        db,
        credentials.email,
        credentials.password,
    )

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return token

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "role": current_user.role,
    }

@router.get("/test-token")
def test_token(
    current_user: User = Depends(get_current_user),
):
    return {
        "message": "Token is valid",
        "user": current_user.email,
    }

@router.get(
    "/users",
    response_model=list[UserListResponse],
)
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all_users(db)