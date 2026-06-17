from fastapi import Depends, HTTPException

from app.auth.dependencies import get_current_user
from app.models.user import User


def require_admin_or_manager(
    current_user: User = Depends(
        get_current_user
    ),
):
    if current_user.role not in [
        "Admin",
        "Manager",
    ]:
        raise HTTPException(
            status_code=403,
            detail="Permission denied",
        )

    return current_user