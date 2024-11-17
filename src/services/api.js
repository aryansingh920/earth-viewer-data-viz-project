const API_BASE_URL = 'http://localhost:8000';

export const countryService = {

    async detectCountry(coordinates) {
        try
        {
            const response = await fetch(`${API_BASE_URL}/detect-country`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coordinates)
            });

            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }

            console.log('response', response);

            return await response.json();
        } catch (error)
        {
            console.error('Error detecting country:', error);
            return null;
        }
    },

    async getMajorCountries() {
        try
        {
            const response = await fetch(`${API_BASE_URL}/major-countries`);

            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }

            console.log('response', response);


            return await response.json();
        } catch (error)
        {
            console.error('Error fetching major countries:', error);
            return null;
        }
    },

    // Add to existing countryService object
    async compareCountries(country1, country2) {
        try
        {
            console.log('Comparing countries:', country1, country2);
            const response = await fetch(`${API_BASE_URL}/compare-countries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country1,  // Send just the names, not the whole object
                    country2
                })
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Comparison response:', data);
            return data;
        } catch (error)
        {
            console.error('Error comparing countries:', error);
            return null;
        }
    }
};

export default countryService;

