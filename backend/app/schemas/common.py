from __future__ import annotations

from typing import Annotated

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator


PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class MongoModel(BaseModel):
    id: PyObjectId | None = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

