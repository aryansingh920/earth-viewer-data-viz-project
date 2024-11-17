import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { ChartBar, RotateCcw, Sun, Moon } from 'lucide-react';
import EarthMesh from './EarthMesh';
import Lighting from './Lighting';
import CameraControls from './CameraControls';
import Stars from '../Stars';
import Sidebar from '../Sidebar';
import { useEarthInteraction } from './hooks/useEarthInteraction';
import { useEarthRotation } from './hooks/useEarthRotation';
import { useCountryComparison } from './hooks/useCountryComparison';
import GraphModal from './GraphModal';

function EarthScene() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState(null);


    // console.log("leftSidebarOpen", leftSidebarOpen);
    // console.log("rightSidebarOpen", rightSidebarOpen);
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
        isRotating,
        handleModeToggle,
        setIsRotating
    } = useEarthRotation(earthRef, leftSidebarOpen, rightSidebarOpen);


    useEffect(() => {
        // Automatically rotate the sphere if both sidebars are closed
        if (!leftSidebarOpen && !rightSidebarOpen)
        {
            setIsRotating(true);
        } else
        {
            setIsRotating(false);
        }
    }, [leftSidebarOpen, rightSidebarOpen, setIsRotating]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedGraph)
            {
                setSelectedGraph(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedGraph]);

    const handleGenerateComparison = async () => {
        await generateComparison();
        setShowGraphs(true);
    };

    const handleResetComparison = () => {
        resetComparison();
        setShowGraphs(false);
    };

    const handleGraphClick = (title, imageData) => {
        setSelectedGraph({ title, imageData });
    };

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
                {/* Left Sidebar */}
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

                    {showGraphs && comparisonGraphs && (
                        <div className="graphs-section">
                            <h4>Comparison Analysis</h4>
                            <div className="graphs-container">
                                {Object.entries(comparisonGraphs).map(([title, base64Image]) => (
                                    <div
                                        key={title}
                                        className="graph-container"
                                        onClick={() => handleGraphClick(title, base64Image)}
                                    >
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
                </Sidebar>

                {/* Right Sidebar */}
                <Sidebar
                    position="right"
                    isOpen={rightSidebarOpen}
                    onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
                    title="Country Information"
                >
                    {hoverCountry && (
                        <div className="country-info">
                            <h3>{hoverCountry.name}</h3>
                            {hoverCountry.data && Object.entries(hoverCountry.data).map(([key, value]) => (
                                <div
                                    style={{
                                        marginBottom: 5,
                                    }}
                                    key={key}
                                    className="info-item"
                                >
                                    <span className="label"><b>{key}</b></span> &nbsp;:&nbsp;
                                    <span className="value">
                                        {typeof value === 'number'
                                            ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                            : value}
                                    </span>
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

                        <div className="action-buttons">
                            <button
                                className="generate-button"
                                onClick={handleGenerateComparison}
                                disabled={!country1 || !country2 || isLoading}
                            >
                                <ChartBar size={16} />
                                {isLoading ? 'Generating...' : 'Generate Comparison'}
                            </button>

                            {(country1 || country2) && (
                                <button
                                    className="reset-button"
                                    onClick={handleResetComparison}
                                >
                                    Reset Selection
                                </button>
                            )}
                        </div>
                    </div>
                </Sidebar>
            </Html>

            {/* Graph Modal */}
            {selectedGraph && (
                <GraphModal
                    title={selectedGraph.title}
                    imageData={selectedGraph.imageData}
                    onClose={() => setSelectedGraph(null)}
                />
            )}
            <Stars />
        </>
    );
}

export default EarthScene;
