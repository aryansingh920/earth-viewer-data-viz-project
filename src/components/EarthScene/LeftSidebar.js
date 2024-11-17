import React from 'react';
import { Moon, Sun } from 'lucide-react';

function LeftSidebar({
    isOpen,
    onToggle,
    isNightMode,
    onNightModeToggle,
    comparisonGraphs
}) {
    return (
        <div className={`sidebar left ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-toggle" onClick={onToggle} />
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <h3>Visualization</h3>
                </div>

                <div className="mode-control">
                    <button
                        className={`mode-toggle-button ${isNightMode ? 'night' : 'day'}`}
                        onClick={onNightModeToggle}
                    >
                        {isNightMode ? (
                            <>
                                <Sun size={16} />
                                <span>Day View</span>
                            </>
                        ) : (
                            <>
                                <Moon size={16} />
                                <span>Night View</span>
                            </>
                        )}
                    </button>
                </div>

                {comparisonGraphs && (
                    <div className="graphs-section">
                        <h4>Comparison Analysis</h4>
                        <div className="graphs-container">
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default LeftSidebar;
