import geopandas as gpd
import numpy as np
from shapely.geometry import Point
import json
import os
import requests
from zipfile import ZipFile
from io import BytesIO


class CountryDetector:
    def __init__(self):
        self.data_dir = "data"
        self.shapefile_path = os.path.join(
            self.data_dir, "ne_110m_admin_0_countries.shp")

        # Create data directory if it doesn't exist
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)

        # Download and extract data if it doesn't exist
        if not os.path.exists(self.shapefile_path):
            self._download_natural_earth_data()

        # Load world geometry data
        self.world = gpd.read_file(self.shapefile_path)

        # Pre-process data for major countries
        self.major_countries = {
            'United States of America': 'USA',
            'Canada': 'CAN',
            'Russian Federation': 'RUS',
            'India': 'IND',
            "China": 'CHN',
            'United Kingdom': 'GBR',
            'Ireland': 'IRL',
            'France': 'FRA',
            'Netherlands': 'NLD',
            'Germany': 'DEU'
        }

        # Create simplified geometries for better performance
        self.world['geometry'] = self.world['geometry'].simplify(0.1)

    def _download_natural_earth_data(self):
        """Download and extract Natural Earth data"""
        url = "https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/110m/cultural/ne_110m_admin_0_countries.zip"

        try:
            print("Downloading Natural Earth data...")
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }

            # First try the primary URL
            response = requests.get(url, headers=headers, timeout=30)

            # If primary URL fails, try backup URL
            if response.status_code != 200:
                backup_url = "https://github.com/nvkelso/natural-earth-vector/raw/master/110m_cultural/ne_110m_admin_0_countries.zip"
                print("Primary download failed, trying backup URL...")
                response = requests.get(
                    backup_url, headers=headers, timeout=30)

            response.raise_for_status()

            print("Data downloaded successfully, extracting...")
            with ZipFile(BytesIO(response.content)) as zip_file:
                zip_file.extractall(self.data_dir)
            print("Data extracted successfully!")

        except requests.exceptions.RequestException as e:
            print(f"Error downloading data: {e}")
            # Provide instructions for manual download
            error_msg = """
            Unable to automatically download the Natural Earth data.
            Please manually download the data:
            1. Go to https://www.naturalearthdata.com/downloads/110m-cultural-vectors/
            2. Download "Admin 0 – Countries"
            3. Extract the zip file
            4. Place the extracted files in a 'data' folder in your project directory
            """
            raise Exception(
                f"Failed to download Natural Earth data: {error_msg}")
        except Exception as e:
            print(f"Unexpected error: {e}")
            raise

    def cartesian_to_spherical(self, x: float, y: float, z: float) -> tuple:
        """Convert 3D cartesian coordinates to spherical (lat/lon)"""
        radius = np.sqrt(x**2 + y**2 + z**2)
        lat = np.arcsin(z/radius) * 180/np.pi
        lon = np.arctan2(y, x) * 180/np.pi
        return lat, lon

    def determine_country(self, x: float, y: float, z: float) -> dict:
        """
        Determine country from 3D coordinates
        Returns: dictionary with country information
        """
        try:
            lat, lon = self.cartesian_to_spherical(x, y, z)
            point = Point(lon, lat)

            # Find which country contains this point
            for idx, country in self.world.iterrows():
                if country.geometry.contains(point):
                    name = country['SOVEREIGNT']  # Updated column name
                    is_major = name in self.major_countries
                    code = self.major_countries.get(name, country['ADM0_A3'])
                    return {
                        'name': name,
                        'code': code,
                        'is_major': is_major,
                        'lat': lat,
                        'lon': lon
                    }

            return {
                'name': 'Ocean',
                'code': 'OCN',
                'is_major': False,
                'lat': lat,
                'lon': lon
            }

        except Exception as e:
            print(f"Error determining country: {e}")
            return None

    def get_major_countries(self) -> dict:
        """Export GeoJSON for major countries"""
        try:
            major_borders = self.world[self.world['SOVEREIGNT'].isin(
                self.major_countries.keys())]
            return json.loads(major_borders.to_json())
        except Exception as e:
            print(f"Error getting major countries: {e}")
            return {}
