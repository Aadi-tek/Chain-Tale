from fastapi import APIRouter

from .routes import archive, auth, badges, leaderboard, stories, tags

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(tags.router)
api_router.include_router(stories.router)
api_router.include_router(archive.router)
api_router.include_router(leaderboard.router)
api_router.include_router(badges.router)

