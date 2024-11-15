import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useEffect } from 'react';

function EarthScene() {
    const earthRef = useRef();

    // Load textures
    const earthTexture = useLoader(TextureLoader, '/textures/8k_earth_daymap.jpg');

    // Rotation animation
    useFrame(() => {
        if (earthRef.current)
        {
            earthRef.current.rotation.y += 0.001;
        }
    });

    // Add lighting
    return (
        <>
            {/* Ambient light */}
            <ambientLight intensity={0.5} />

            {/* Point light */}
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Earth sphere */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    map={earthTexture}
                    metalness={0.4}
                    roughness={0.7}
                />
            </mesh>
        </>
    );
}

export default EarthScene;
