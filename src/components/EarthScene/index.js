import React from 'react';
import { Html } from '@react-three/drei';
import EarthMesh from './EarthMesh';
import Lighting from './Lighting';
import Controls from './Controls';
import Stars from '../Stars';
import CountryTooltip from '../CountryTooltip';
import { useEarthInteraction } from './hooks/useEarthInteraction';
import { useEarthRotation } from './hooks/useEarthRotation';

function EarthScene() {
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
            <Lighting isNightMode={isNightMode} />

            <EarthMesh
                ref={earthRef}
                isNightMode={isNightMode}
                onPointerMove={handlePointerMove}
                hoverCountry={hoverCountry}
                isRotating={isRotating}
            />

            <Html fullscreen>
                <Controls
                    isNightMode={isNightMode}
                    onToggle={handleModeToggle}
                    isAnimating={isAnimating}
                />
            </Html>

            {hoverCountry && <CountryTooltip country={hoverCountry} />}
            <Stars />
        </>
    );
}

export default EarthScene;
