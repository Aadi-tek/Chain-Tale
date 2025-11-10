from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import List

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.leaderboard import LeaderboardEntry, LeaderboardResponse


class LeaderboardService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["leaderboards"]

    async def get_current_week(self) -> LeaderboardResponse:
        today = datetime.now(timezone.utc).date()
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=6)
        doc = await self.collection.find_one({"week_start": week_start.isoformat()})
        entries = [
            LeaderboardEntry(user_id=e["user_id"], username=e["username"], points=e["points"], rank=i + 1)
            for i, e in enumerate(doc["entries"])  # type: ignore[index]
        ] if doc else []
        return LeaderboardResponse(week_start=week_start, week_end=week_end, entries=entries)

    async def update_weekly_leaderboard(self, entries: List[LeaderboardEntry]) -> None:
        today = date.today()
        week_start = today - timedelta(days=today.weekday())
        await self.collection.update_one(
            {"week_start": week_start.isoformat()},
            {"$set": {"entries": [entry.model_dump() for entry in entries]}},
            upsert=True,
        )

