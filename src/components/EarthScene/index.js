import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import EarthMesh from './EarthMesh';
import Lighting from './Lighting';
import CameraControls from './CameraControls';
import Stars from '../Stars';
import CountryTooltip from '../CountryTooltip';
import Sidebar from '../Sidebar';
import { Sun, Moon, Info } from 'lucide-react';
import { useEarthInteraction } from './hooks/useEarthInteraction';
import { useEarthRotation } from './hooks/useEarthRotation';

function EarthScene() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    const {
        earthRef,
        hoverCountry,
        handlePointerMove,
    } = useEarthInteraction();

    const {
        isNightMode,
        setIsNightMode,
        isAnimating,
        isRotating,
        handleModeToggle
    } = useEarthRotation(earthRef);

    return (
        <>
            <CameraControls />
            <Lighting isNightMode={isNightMode} />

            <EarthMesh
                ref={earthRef}
                isNightMode={isNightMode}
                onPointerMove={handlePointerMove}
                hoverCountry={hoverCountry}
                isRotating={isRotating}
            />

            <Html fullscreen>
                {/* Left Sidebar - Controls */}
                <Sidebar
                    position="left"
                    isOpen={leftSidebarOpen}
                    onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
                    title="Controls"
                >
                    <div className="controls-section">
                        <button
                            className="control-button"
                            onClick={handleModeToggle}
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

                    {/* <div className="usage-guide">
                        <h4>Usage Guide</h4>
                        <ul>
                            <li>Zoom: Mouse wheel / Pinch</li>
                            <li>Rotate: Click and drag</li>
                            <li>Hover: Country information</li>
                        </ul>
                    </div> */}
                </Sidebar>

                {/* Right Sidebar - Country Info */}
                <Sidebar
                    position="right"
                    isOpen={rightSidebarOpen}
                    onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
                    title="Country Information"
                >
                    {hoverCountry ? (
                        <div className="stats-section">
                            <h4>{hoverCountry.name}</h4>
                            {hoverCountry.data && Object.entries(hoverCountry.data).map(([key, value]) => (
                                <div key={key} className="stat-item">
                                    <div className="stat-label">{key}</div>
                                    <div className="stat-value">
                                        {typeof value === 'number' ?
                                            new Intl.NumberFormat().format(value) :
                                            value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-country-selected">
                            <Info size={24} />
                            <p>Hover over a country to see its information</p>
                        </div>
                    )}
                </Sidebar>
            </Html>

            <Stars />
        </>
    );
}

export default EarthScene;
