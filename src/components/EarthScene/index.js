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
import { useCountryComparison } from './hooks/useCountryComparison';
import CountryInfoSidebar from './CountryInfoSidebar';

function EarthScene() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    const {
        earthRef,
        hoverCountry,
        handlePointerMove,
    } = useEarthInteraction();

    const {
        country1,
        country2,
        comparisonGraphs,
        isLoading,
        generateComparison,
        resetComparison
    } = useCountryComparison(hoverCountry);

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
                <CountryInfoSidebar
                    country={hoverCountry}
                    isOpen={rightSidebarOpen}
                    onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
                    country1={country1}
                    country2={country2}
                    comparisonGraphs={comparisonGraphs}
                    isLoading={isLoading}
                    onGenerateComparison={generateComparison}
                    onResetComparison={resetComparison}
                />
            </Html>

            <Stars />
        </>
    );
}

export default EarthScene;
