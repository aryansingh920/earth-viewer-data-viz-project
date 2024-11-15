import React from 'react';
import * as THREE from 'three';

function Lighting({ isNightMode }) {
    const nightLightColor = new THREE.Color(0x3366ff);

    return (
        <>
            <ambientLight
                intensity={isNightMode ? 0.3 : 0.6}
                color={isNightMode ? nightLightColor : 0xffffff}
            />

            <directionalLight
                position={[5, 3, 5]}
                intensity={isNightMode ? 0.4 : 1}
                color={isNightMode ? 0x4466ff : 0xffffff}
            />

            {isNightMode && (
                <>
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
            )}
        </>
    );
}

export default Lighting;
