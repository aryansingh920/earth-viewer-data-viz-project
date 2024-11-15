import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import Stars from './Stars';

function EarthScene() {
    const earthRef = useRef();
    const [isRotating, setIsRotating] = useState(true);
    const earthTexture = useLoader(TextureLoader, '/textures/8k_earth_daymap.jpg');

    useEffect(() => {
        const handlePointerDown = () => setIsRotating(false);
        const handlePointerUp = () => setIsRotating(true);

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointerleave', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointerleave', handlePointerUp);
        };
    }, []);

    useFrame(() => {
        if (earthRef.current && isRotating)
        {
            earthRef.current.rotation.y += 0.001;
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[5, 3, 5]}
                intensity={1}
                color={0xffffff}
            />
            <directionalLight
                position={[-5, -3, -5]}
                intensity={0.8}
                color={0xffffff}
            />
            <pointLight
                position={[0, 10, 0]}
                intensity={0.5}
                color={0xffffff}
            />
            <pointLight
                position={[0, -10, 0]}
                intensity={0.5}
                color={0xffffff}
            />
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
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={earthTexture}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>
            <Stars />
        </>
    );
}

export default EarthScene;
