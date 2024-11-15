import React from 'react';

function Controls({ isNightMode, onToggle, isAnimating }) {
    return (
        <div className="earth-controls">
            <div className="mode-button">
                <button
                    onClick={onToggle}
                    className={`control-button ${isAnimating ? 'switching' : ''}`}
                >
                    <div className="button-content">
                        {isNightMode ? (
                            <>
                                <span className="mode-icon">☀️</span>
                                <span className="mode-text">Day View</span>
                            </>
                        ) : (
                            <>
                                <span className="mode-icon">🌙</span>
                                <span className="mode-text">Night View</span>
                            </>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Controls;
