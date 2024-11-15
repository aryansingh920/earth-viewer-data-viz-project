from fastapi import APIRouter
from ..models.coordinates import Coordinates
from ..services.detector import CountryDetector

router = APIRouter()
detector = CountryDetector()


@router.post("/detect-country")
async def detect_country(coords: Coordinates):
    return detector.determine_country(coords.x, coords.y, coords.z)


@router.get("/major-countries")
async def get_major_countries():
    return detector.get_major_countries()
