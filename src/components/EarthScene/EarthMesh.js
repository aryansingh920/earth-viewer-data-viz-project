import React, { forwardRef, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGlowEffect } from './hooks/useGlowEffect';

const EarthMesh = forwardRef(({ isNightMode, onPointerMove, hoverCountry }, ref) => {
    const [dayTexture, nightTexture, cloudTexture, normalMap, specularMap] = useLoader(TextureLoader, [
        '/textures/8k_earth_daymap.jpg',
        '/textures/8k_earth_nightmap.jpg',
        '/textures/8k_earth_clouds.jpg',
        '/textures/8k_earth_normal_map.jpg',
        '/textures/8k_earth_specular_map.jpg' // Use as metalnessMap
    ]);

    const outlineMaterial = useGlowEffect();

    // Ref for the cloud layer
    const cloudRef = useRef();

    // Animation loop
    useFrame(() => {
        if (cloudRef.current)
        {
            cloudRef.current.rotation.y += 0.0001; // Adjust speed as needed
        }
    });

    return (
        <group>
            <mesh ref={ref} onPointerMove={onPointerMove}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={isNightMode ? nightTexture : dayTexture} // Switch day/night
                    normalMap={normalMap} // Surface details
                    metalnessMap={specularMap} // Reflectivity for water
                    roughness={0.4} // Controls surface roughness
                    metalness={0.3} // Global metalness adjustment
                    emissiveMap={nightTexture} // Slight glow for city lights at night
                    emissiveIntensity={isNightMode ? 0.6 : 0} // Adjust based on mode
                />
            </mesh>

            {/* Cloud Layer */}
            <mesh ref={cloudRef}>
                <sphereGeometry args={[1.007, 64, 64]} /> {/* Slightly larger than Earth */}
                <meshStandardMaterial
                    map={cloudTexture}
                    transparent={true}
                    opacity={isNightMode ? 0.2 : 0.4} // Cloud intensity
                    depthWrite={false} // Prevent z-fighting with the Earth mesh
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
