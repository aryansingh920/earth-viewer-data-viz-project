import React, { forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGlowEffect } from './hooks/useGlowEffect';

const EarthMesh = forwardRef(({ isNightMode, onPointerMove, hoverCountry }, ref) => {
    const [dayTexture, nightTexture] = useLoader(TextureLoader, [
        '/textures/8k_earth_daymap.jpg',
        '/textures/8k_earth_nightmap.jpg'
    ]);

    const outlineMaterial = useGlowEffect();

    return (
        <group>
            <mesh ref={ref} onPointerMove={onPointerMove}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={isNightMode ? nightTexture : dayTexture}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {hoverCountry && (
                <mesh>
                    <sphereGeometry args={[1.01, 64, 64]} />
                    <shaderMaterial {...outlineMaterial} />
                </mesh>
            )}
        </group>
    );
});

export default EarthMesh;
