from __future__ import annotations

from datetime import datetime
from typing import List

from pydantic import BaseModel

from .common import MongoModel, PyObjectId


class Comment(BaseModel):
    user_id: PyObjectId
    text: str
    timestamp: datetime


class StoryLine(BaseModel):
    id: PyObjectId | None = None
    user_id: PyObjectId
    content: str
    timestamp: datetime
    upvotes: int = 0
    comments: List[Comment] = []


class StoryPublic(MongoModel):
    tag_id: PyObjectId
    title: str
    lines: List[StoryLine] = []
    word_count: int = 0
    created_at: datetime
    is_archived: bool = False


class LineCreate(BaseModel):
    content: str


class VoteRequest(BaseModel):
    direction: int  # 1 for upvote, -1 for downvote


class CommentCreate(BaseModel):
    text: str

