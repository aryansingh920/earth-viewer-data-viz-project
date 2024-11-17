from fastapi import APIRouter, HTTPException
from app.models.CountryCompare import CountryCompare


from ..models.coordinates import Coordinates
from ..services.detector import CountryDetector
from ..services.data_service import CountryDataService
from typing import Dict, Any

router = APIRouter()
detector = CountryDetector()
data_service = CountryDataService()


@router.post("/detect-country")
async def detect_country(coords: Coordinates) -> Dict[str, Any]:
    try:
        country_info = detector.determine_country(coords.x, coords.y, coords.z)
        if country_info and country_info['name'] != 'Ocean':
            # Get additional country data
            country_data = data_service.get_country_data(country_info['name'])
            country_info['data'] = country_data
        return country_info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/major-countries")
async def get_major_countries() -> Dict[str, Any]:
    try:
        return detector.get_major_countries()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/country-data/{country_name}")
async def get_country_data(country_name: str) -> Dict[str, Any]:
    try:
        data = data_service.get_country_data(country_name)
        if not data:
            raise HTTPException(
                status_code=404, detail="Country not found or no data available")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare-countries")
async def compare_countries(request: CountryCompare):
    try:
        graphs = data_service.generate_comparison_graphs(
            request.country1, request.country2)
        return {"graphs": graphs}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
