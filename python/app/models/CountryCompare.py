from pydantic import BaseModel


class CountryCompare(BaseModel):
    country1: str
    country2: str
