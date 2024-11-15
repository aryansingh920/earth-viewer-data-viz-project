# models/coordinates.py
from pydantic import BaseModel


class Coordinates(BaseModel):
    x: float
    y: float
    z: float
