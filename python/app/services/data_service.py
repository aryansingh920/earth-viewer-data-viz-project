import pandas as pd
from typing import Dict, Any
import os
import matplotlib.pyplot as plt
import io
import base64

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

    def generate_comparison_graphs(self, country1: str, country2: str) -> Dict[str, str]:
        country1_data = self.get_country_data(country1)
        country2_data = self.get_country_data(country2)

        if not country1_data or not country2_data:
            raise ValueError("Data for one or both countries not available.")

        graph_images = {}

        def save_graph_to_base64():
            buffer = io.BytesIO()
            plt.savefig(buffer, format="png", facecolor='black')
            buffer.seek(0)
            graph_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
            buffer.close()
            plt.close()
            return graph_base64

        def set_dark_theme():
            plt.rcParams.update({
                "figure.facecolor": "black",
                "axes.facecolor": "black",
                "axes.edgecolor": "white",
                "axes.labelcolor": "white",
                "xtick.color": "white",
                "ytick.color": "white",
                "text.color": "white",
                "legend.facecolor": "black",
                "legend.edgecolor": "white"
            })

        set_dark_theme()

        # Bar Chart: GDP
        if "GDP (USD)" in country1_data and "GDP (USD)" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.bar([country1, country2],
                    [country1_data["GDP (USD)"], country2_data["GDP (USD)"]])
            plt.title("GDP Comparison", color='white')
            plt.xlabel("Country", color='white')
            plt.ylabel("GDP (USD)", color='white')
            graph_images["GDP Comparison"] = save_graph_to_base64()

        # Bar Chart: GDP per Capita
        if "GDP per Capita (USD)" in country1_data and "GDP per Capita (USD)" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.bar([country1, country2],
                    [country1_data["GDP per Capita (USD)"], country2_data["GDP per Capita (USD)"]], color=['blue', 'orange'])
            plt.title("GDP per Capita Comparison", color='white')
            plt.xlabel("Country", color='white')
            plt.ylabel("GDP per Capita (USD)", color='white')
            graph_images["GDP per Capita Comparison"] = save_graph_to_base64()

        # Bar Chart: Population
        if "Population" in country1_data and "Population" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.bar([country1, country2],
                    [country1_data["Population"], country2_data["Population"]], color=['green', 'purple'])
            plt.title("Population Comparison", color='white')
            plt.xlabel("Country", color='white')
            plt.ylabel("Population", color='white')
            graph_images["Population Comparison"] = save_graph_to_base64()

        # Pie Chart: Population Share
        if "World Population Share (%)" in country1_data and "World Population Share (%)" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.pie(
                [country1_data["World Population Share (%)"],
                 country2_data["World Population Share (%)"]],
                labels=[country1, country2],
                autopct="%1.1f%%", textprops={'color': "white"}
            )
            plt.title("World Population Share", color='white')
            graph_images["World Population Share"] = save_graph_to_base64()

        # Bar Chart: Fertility Rate
        if "Fertility Rate" in country1_data and "Fertility Rate" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.bar([country1, country2],
                    [country1_data["Fertility Rate"], country2_data["Fertility Rate"]], color=['red', 'cyan'])
            plt.title("Fertility Rate Comparison", color='white')
            plt.xlabel("Country", color='white')
            plt.ylabel("Fertility Rate", color='white')
            graph_images["Fertility Rate Comparison"] = save_graph_to_base64()

        # Pie Chart: Gender Inequality Index
        if "Gender Inequality Index" in country1_data and "Gender Inequality Index" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.pie(
                [country1_data["Gender Inequality Index"],
                    country2_data["Gender Inequality Index"]],
                labels=[country1, country2],
                autopct="%1.1f%%", textprops={'color': "white"}
            )
            plt.title("Gender Inequality Comparison", color='white')
            graph_images["Gender Inequality Comparison"] = save_graph_to_base64()

        # Bar Chart: Life Expectancy
        if "Life Expectancy" in country1_data and "Life Expectancy" in country2_data:
            plt.figure(figsize=(8, 6))
            plt.bar([country1, country2],
                    [country1_data["Life Expectancy"], country2_data["Life Expectancy"]], color=['pink', 'gray'])
            plt.title("Life Expectancy Comparison", color='white')
            plt.xlabel("Country", color='white')
            plt.ylabel("Life Expectancy (Years)", color='white')
            graph_images["Life Expectancy Comparison"] = save_graph_to_base64()

        return graph_images
