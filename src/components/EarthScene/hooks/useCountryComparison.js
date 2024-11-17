import { useState, useEffect } from 'react';
import countryService from '../../../services/api';

export function useCountryComparison(hoverCountry) {
    const [country1, setCountry1] = useState(null);
    const [country2, setCountry2] = useState(null);
    const [comparisonGraphs, setComparisonGraphs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && hoverCountry)
            {
                if (!country1)
                {
                    console.log('Setting country1:', hoverCountry);
                    setCountry1(hoverCountry);
                } else if (!country2 && hoverCountry.name !== country1.name)
                {
                    console.log('Setting country2:', hoverCountry);
                    setCountry2(hoverCountry);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [hoverCountry, country1]);

    const generateComparison = async () => {
        if (!country1 || !country2) return;

        setIsLoading(true);
        try
        {
            const response = await countryService.compareCountries(
                country1.name,  // Send just the name
                country2.name   // Send just the name
            );

            if (response && response.graphs)
            {
                setComparisonGraphs(response.graphs);
            } else
            {
                console.error('No graphs data in response');
            }
        } catch (error)
        {
            console.error('Error generating comparison:', error);
        } finally
        {
            setIsLoading(false);
        }
    };

    const resetComparison = () => {
        setCountry1(null);
        setCountry2(null);
        setComparisonGraphs(null);
    };

    return {
        country1,
        country2,
        comparisonGraphs,
        isLoading,
        generateComparison,
        resetComparison
    };
}
