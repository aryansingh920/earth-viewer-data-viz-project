import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import Stars from './Stars';

function EarthScene() {
    const earthRef = useRef();

    // Load Earth texture
    const earthTexture = useLoader(TextureLoader, '/textures/8k_earth_daymap.jpg');

    // Rotation animation
    useFrame(() => {
        if (earthRef.current)
        {
            earthRef.current.rotation.y += 0.001;
        }
    });

    return (
        <>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={0.6} />

            {/* Main front light (sun) */}
            <directionalLight
                position={[5, 3, 5]}
                intensity={1}
                color={0xffffff}
            />

            {/* Back light */}
            <directionalLight
                position={[-5, -3, -5]}
                intensity={0.8}
                color={0xffffff}
            />

            {/* Rim lighting from top */}
            <pointLight
                position={[0, 10, 0]}
                intensity={0.5}
                color={0xffffff}
            />

            {/* Rim lighting from bottom */}
            <pointLight
                position={[0, -10, 0]}
                intensity={0.5}
                color={0xffffff}
            />

            {/* Subtle side fills */}
            <pointLight
                position={[10, 0, 0]}
                intensity={0.3}
                color={0xccccff}
            />
            <pointLight
                position={[-10, 0, 0]}
                intensity={0.3}
                color={0xccccff}
            />

            {/* Earth */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={earthTexture}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {/* Stars background */}
            <Stars />

            {/* Helper component to visualize lights (uncomment for debugging) */}
            {/* <axesHelper args={[5]} /> */}
        </>
    );
}

export default EarthScene;
