import React from 'react';
import * as THREE from 'three';

function Lighting({ isNightMode }) {
    const nightLightColor = new THREE.Color(0x3366ff);
    const dayLightColor = new THREE.Color(0xffffff);

    return (
        <>
            {/* Ambient light for general illumination */}
            <ambientLight
                intensity={isNightMode ? 0.3 : 0.6}
                color={isNightMode ? nightLightColor : dayLightColor}
            />

            {isNightMode ? (
                // Night mode lighting
                <>
                    <directionalLight
                        position={[5, 3, 5]}
                        intensity={0.4}
                        color={0x4466ff}
                    />
                    <pointLight
                        position={[0, 10, 0]}
                        intensity={0.3}
                        color={0x3366ff}
                        distance={20}
                    />
                    <hemisphereLight
                        skyColor={0x3366ff}
                        groundColor={0x000066}
                        intensity={1}
                    />
                    <pointLight
                        position={[-10, 0, 0]}
                        intensity={0.2}
                        color={0x3366ff}
                        distance={15}
                    />
                    <pointLight
                        position={[10, 0, 0]}
                        intensity={0.2}
                        color={0x3366ff}
                        distance={15}
                    />
                </>
            ) : (
                // Day mode lighting
                <>
                    {/* Main sunlight */}
                    <directionalLight
                        position={[5, 3, 5]}
                        intensity={1}
                        color={dayLightColor}
                        castShadow
                    />

                    {/* Secondary sun reflection */}
                    <directionalLight
                        position={[-5, -3, -5]}
                        intensity={0.5}
                        color={dayLightColor}
                    />

                    {/* Atmospheric scattering */}
                    <hemisphereLight
                        skyColor={0x87ceeb}  // Sky blue
                        groundColor={0x4ca64c}  // Earth green
                        intensity={0.7}
                    />

                    {/* Rim lighting for better edge definition */}
                    <pointLight
                        position={[10, 0, 0]}
                        intensity={0.4}
                        color={dayLightColor}
                        distance={20}
                    />
                    <pointLight
                        position={[-10, 0, 0]}
                        intensity={0.4}
                        color={dayLightColor}
                        distance={20}
                    />

                    {/* Top and bottom fill lights */}
                    <pointLight
                        position={[0, 10, 0]}
                        intensity={0.3}
                        color={dayLightColor}
                        distance={20}
                    />
                    <pointLight
                        position={[0, -10, 0]}
                        intensity={0.3}
                        color={dayLightColor}
                        distance={20}
                    />
                </>
            )}
        </>
    );
}

export default Lighting;
