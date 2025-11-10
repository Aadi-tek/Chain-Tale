from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Dict

from jose import JWTError, jwt
from passlib.context import CryptContext

from .config import get_settings

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def _create_token(data: Dict[str, Any], expires_delta: timedelta, secret: str) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret, algorithm=get_settings().jwt_algorithm)


def create_access_token(subject: str, additional_claims: Dict[str, Any] | None = None) -> str:
    settings = get_settings()
    expire_delta = timedelta(minutes=settings.access_token_expires_minutes)
    claims = {"sub": subject} | (additional_claims or {})
    return _create_token(claims, expire_delta, settings.jwt_secret_key)


def create_refresh_token(subject: str) -> str:
    settings = get_settings()
    secret = settings.jwt_refresh_secret_key or settings.jwt_secret_key
    expire_delta = timedelta(minutes=settings.refresh_token_expires_minutes)
    return _create_token({"sub": subject, "type": "refresh"}, expire_delta, secret)


def decode_token(token: str, refresh: bool = False) -> Dict[str, Any]:
    settings = get_settings()
    secret = (settings.jwt_refresh_secret_key or settings.jwt_secret_key) if refresh else settings.jwt_secret_key
    try:
        return jwt.decode(token, secret, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:
        raise ValueError("Invalid or expired token") from exc

