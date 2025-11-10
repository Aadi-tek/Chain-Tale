from __future__ import annotations

from datetime import date
from typing import List

from pydantic import BaseModel


class LeaderboardEntry(BaseModel):
    user_id: str
    username: str
    points: int
    rank: int


class LeaderboardResponse(BaseModel):
    week_start: date
    week_end: date
    entries: List[LeaderboardEntry]

