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
    }
};

export default countryService;
