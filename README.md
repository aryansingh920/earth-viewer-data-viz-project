
Introduction
1.	Motivation for the Project:
o	Discuss why a 3D visualization of Earth is an excellent choice for showcasing complex data in a visually engaging way.
o	Highlight how the project aligns with the assignment objectives, such as combining multiple idioms (3D visualization and interactive graphs) and supporting interactive data exploration.
o	State how this visualization provides intuitive insights into global datasets (e.g., economic indicators, population metrics) in a way that is not achievable with traditional static charts.
2.	Objective:
o	Create a dynamic, interactive visualization that combines geographic and statistical data, enabling users to explore and compare key metrics across countries.
o	Facilitate understanding of multidimensional datasets through innovative visualization methods.
3.	Overview of Features:
o	A rotatable, zoomable, textured 3D Earth model with multiple layers (day, night, clouds, heat maps).
o	Interactive exploration with hover-based data retrieval and comparative analysis between countries.
o	Dynamic graph generation for visual comparison of selected countries' metrics.
 
Description
1.	Dataset and Complexity:
o	Data Source: Mention the sources of the data, such as Kaggle for the metrics (e.g., GDP, population) and NASA for Earth texture maps.
o	Complexity: Explain the dataset's multivariate nature, covering economic, social, and demographic dimensions. Emphasize how visualizing these relationships requires moving beyond standard charts.
2.	Technical Implementation:
o	3D Earth Visualization:
	Tools: Built using Three.js and Fibre for rendering the 3D Earth.
	Features: Realistic textures (day, night, and clouds) and seamless interaction (rotation and zoom).
	Technical Detail: Use of shapely and geo-pandas to calculate hover interactions based on latitude and longitude, enabling country-specific data retrieval.
o	Data Analysis and Graphs:
	Backend: Fast API server for processing and rendering graphs using matplotlib.
	Process: Upon selecting two countries, their data is sent to the backend, processed, and displayed as comparison graphs (e.g., GDP, GDP per capita, fertility rate).
3.	Interactive Features:
o	Real-time user interactions, such as hovering over countries to see data and selecting countries to generate comparative graphs.
o	Sidebar for data display and graph thumbnail previews, with the ability to enlarge graphs for detailed views.
4.	Visualization Details:
o	Encoding Channels: Geographic position (latitude and longitude) mapped to spatial positions on the 3D sphere, with colour and texture changes for night mode, heat maps, and clouds.
o	Interactivity: Dynamic graph updates and Earth manipulations to explore data in a user-friendly manner.
5.	Novelty and Innovation:
o	The combination of 3D geographic data with interactive, dynamic statistical graphs in one unified interface.
o	Unique rendering of country-specific overlays and real-time data visual exploration on a rotating Earth model.
 
References
1.	Video Presentation Link : https://www.youtube.com/watch?v=7_NrSDwLk_M&t=86s 
2.	Geo Pandas Documentation : https://geopandas.org/en/stable/ 
3.	Three.js Documentation : https://threejs.org 
4.	Texture Map : https://nasa3d.arc.nasa.gov/images 
5.	GitHub: https://github.com/aryansingh920/earth-viewer-data-viz-project  
6.	Kaggle Data sets : https://www.kaggle.com/datasets/nishanthsalian/socioeconomic-country-profiles, https://www.kaggle.com/datasets/iamsouravbanerjee/world-population-dataset 
