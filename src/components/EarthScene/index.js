import React from 'react';
import { Html } from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import EarthMesh from './EarthMesh';
import Lighting from './Lighting';
import Controls from './Controls';
import CameraControls from './CameraControls';
import Stars from '../Stars';
import CountryTooltip from '../CountryTooltip';
import { useEarthInteraction } from './hooks/useEarthInteraction';
import { useEarthRotation } from './hooks/useEarthRotation';
import { setHoveredCountry } from '../../store/slices/countryDataSlice';
import { toggleNightMode, setRotationSpeed } from '../../store/slices/earthControlsSlice';

function EarthScene() {
    const {
        earthRef,
        hoverCountry,
        handlePointerMove,
    } = useEarthInteraction();

    const {
        isNightMode,
        isAnimating,
        isRotating,
        handleModeToggle
    } = useEarthRotation(earthRef);

    const dispatch = useDispatch();

    // Sync local state with Redux when it changes
    React.useEffect(() => {
        if (hoverCountry)
        {
            dispatch(setHoveredCountry(hoverCountry));
        }
    }, [hoverCountry, dispatch]);

    const handleToggle = () => {
        handleModeToggle();
        dispatch(toggleNightMode());
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
                <Controls
                    isNightMode={isNightMode}
                    onToggle={handleToggle}
                    isAnimating={isAnimating}
                />
            </Html>

            {hoverCountry && <CountryTooltip country={hoverCountry} />}
            <Stars />
        </>
    );
}

export default EarthScene;
