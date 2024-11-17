import React from 'react';
import { ChartBar } from 'lucide-react';

function CountryInfoSidebar({
    country,
    isOpen,
    onToggle,
    country1,
    country2,
    comparisonGraphs,
    isLoading,
    onGenerateComparison
}) {
    // Add formatValue function
    const formatValue = (value) => {
        if (typeof value === 'number')
        {
            return value.toLocaleString(undefined, {
                maximumFractionDigits: 2
            });
        }
        return value || 'N/A';
    };

    return (
        <div className={`sidebar right ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-toggle" onClick={onToggle} />
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <h3>Country Information</h3>
                </div>

                {country && (
                    <div className="country-data">
                        <h4>{country.name}</h4>
                        {country.data && Object.entries(country.data).map(([key, value]) => (
                            <div key={key} className="data-item">
                                <span className="label">{key}</span>
                                <span className="value">{formatValue(value)}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="comparison-section">
                    <h4>Country Comparison</h4>
                    <div className="comparison-boxes">
                        <div className={`country-box ${country1 ? 'selected' : ''}`}>
                            {country1 ? country1.name : 'Press Enter to select Country 1'}
                        </div>
                        <div className={`country-box ${country2 ? 'selected' : ''}`}>
                            {country2 ? country2.name : 'Press Enter to select Country 2'}
                        </div>
                    </div>

                    <button
                        className="generate-button"
                        onClick={onGenerateComparison}
                        disabled={!country1 || !country2 || isLoading}
                    >
                        <ChartBar size={16} />
                        {isLoading ? 'Generating...' : 'Generate Comparison'}
                    </button>

                    {comparisonGraphs && (
                        <div className="comparison-graphs">
                            {Object.entries(comparisonGraphs).map(([title, base64Image]) => (
                                <div key={title} className="graph-container">
                                    <h5>{title}</h5>
                                    <img
                                        src={`data:image/png;base64,${base64Image}`}
                                        alt={title}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CountryInfoSidebar;
