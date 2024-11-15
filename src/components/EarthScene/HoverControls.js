import React from 'react';

function HoverControls({ isHoverMode, onToggle, isAnimating }) {
    return (
        <div className="earth-controls">
            <div className="mode-button">
                <button
                    onClick={onToggle}
                    className={`control-button ${isAnimating ? 'switching' : ''}`}
                >
                    <div className="button-content">
                        {isHoverMode ? (
                            <>
                                {/* <span className="mode-icon">☀️</span> */}
                                <span className="mode-text">Hover ON</span>
                            </>
                        ) : (
                            <>
                                {/* <span className="mode-icon">🌙</span> */}
                                <span className="mode-text">Hover OFF</span>
                            </>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
}

export default HoverControls;
