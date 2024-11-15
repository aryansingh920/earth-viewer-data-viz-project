import pandas as pd
from typing import Dict, Any
import os


class CountryDataService:
    def __init__(self):
        self.data_dir = "data/datasets"
        self.datasets = self._load_datasets()

    def _load_datasets(self) -> Dict[str, pd.DataFrame]:
        try:
            return {
                "GDP by Country": pd.read_csv(os.path.join(self.data_dir, "Country wise GDP from 1994 to 2017.csv")),
                "Country Population": pd.read_csv(os.path.join(self.data_dir, "country_population.csv")),
                "Fertility Rate": pd.read_csv(os.path.join(self.data_dir, "fertility_rate.csv")),
                "Gender Inequality Index": pd.read_csv(os.path.join(self.data_dir, "Gender Inequality Index.csv")),
                "Life Expectancy": pd.read_csv(os.path.join(self.data_dir, "life_expectancy.csv")),
                "Socioeconomic Profiles": pd.read_csv(os.path.join(self.data_dir, "soci_econ_country_profiles.csv")),
                "World Population": pd.read_csv(os.path.join(self.data_dir, "world_population.csv")),
            }
        except Exception as e:
            print(f"Error loading datasets: {e}")
            return {}

    def get_country_data(self, country_name: str) -> Dict[str, Any]:
        country_name = country_name.strip().lower()  # Normalize input
        data = {}
        try:
            # Normalize country names in datasets to lowercase
            for key, df in self.datasets.items():
                if "Country" in df.columns or "Country Name" in df.columns:
                    df.columns = df.columns.str.strip()
                    if 'Country' in df.columns:
                        df['Country'] = df['Country'].str.lower().str.strip()
                    elif 'Country Name' in df.columns:
                        df['Country Name'] = df['Country Name'].str.lower().str.strip()
                    elif 'Country/Territory' in df.columns:
                        df['Country/Territory'] = df['Country/Territory'].str.lower().str.strip()

            # GDP Data
            gdp_data = self.datasets["GDP by Country"]
            gdp_row = gdp_data[gdp_data["Country"] == country_name].sort_values(
                by="Year", ascending=False).head(1)
            if not gdp_row.empty:
                data["GDP (USD)"] = float(gdp_row.iloc[0]["GDP (in USD)"])
                data["GDP per Capita (USD)"] = float(
                    gdp_row.iloc[0]["GDP per capita (in USD)"])
                data["GDP Growth Rate (%)"] = float(
                    gdp_row.iloc[0]["GDP change (%)"])

            # Population Data
            pop_data = self.datasets["Country Population"]
            pop_row = pop_data[pop_data["Country Name"]
                               == country_name].iloc[:, -1]
            if not pop_row.empty:
                data["Population"] = float(pop_row.values[0])

            # Fertility Rate
            fert_data = self.datasets["Fertility Rate"]
            fert_row = fert_data[fert_data["Country Name"]
                                 == country_name].iloc[:, -1]
            if not fert_row.empty:
                data["Fertility Rate"] = float(fert_row.values[0])

            # Gender Inequality Index
            gii_data = self.datasets["Gender Inequality Index"]
            gii_row = gii_data[gii_data["Country"] == country_name].iloc[:, -1]
            if not gii_row.empty:
                data["Gender Inequality Index"] = float(gii_row.values[0])

            # Life Expectancy
            life_data = self.datasets["Life Expectancy"]
            life_row = life_data[life_data["Country Name"]
                                 == country_name].iloc[:, -1]
            if not life_row.empty:
                data["Life Expectancy"] = float(life_row.values[0])

            # Socioeconomic Profiles
            socio_data = self.datasets["Socioeconomic Profiles"]
            socio_row = socio_data[socio_data["country"] == country_name]
            if not socio_row.empty:
                data["Urban Population (%)"] = float(
                    socio_row.iloc[0]["Urban population (% of total population)_x"])
                data["Unemployment Rate (%)"] = float(
                    socio_row.iloc[0]["Unemployment (% of labour force)"])
                data["Health Expenditure (% of GDP)"] = float(
                    socio_row.iloc[0]["Health: Total expenditure (% of GDP)"])
                data["Education Expenditure (% of GDP)"] = float(
                    socio_row.iloc[0]["Education: Government expenditure (% of GDP)"])

            # World Population
            world_data = self.datasets["World Population"]
            world_row = world_data[world_data["Country/Territory"]
                                   == country_name]
            if not world_row.empty:
                data["World Population Rank"] = int(world_row.iloc[0]["Rank"])
                data["Population Density"] = float(
                    world_row.iloc[0]["Density (per km²)"])
                data["World Population Share (%)"] = float(
                    world_row.iloc[0]["World Population Percentage"])

            return data
        except Exception as e:
            print(f"Error getting country data: {e}")
            return {}
