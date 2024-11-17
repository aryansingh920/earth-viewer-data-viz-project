import React from 'react';
import { ChartBar, RotateCcw } from 'lucide-react';

function RightSidebar({
    isOpen,
    onToggle,
    country,
    country1,
    country2,
    onGenerateComparison,
    onResetComparison,
    isLoading
}) {
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
                    <div className="comparison-header">
                        <h4>Country Comparison</h4>
                        {(country1 || country2) && (
                            <button
                                className="reset-button"
                                onClick={onResetComparison}
                                title="Reset selection"
                            >
                                <RotateCcw size={14} />
                            </button>
                        )}
                    </div>

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
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
