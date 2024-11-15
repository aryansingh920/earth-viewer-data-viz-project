/* eslint-disable no-unused-vars */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars({ count = 5000 }) {
    const points = useRef();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++)
        {
            const distance = Math.random() * 50 + 10; // Distance from center
            const theta = 2 * Math.PI * Math.random(); // Random angle around y-axis
            const phi = Math.acos((2 * Math.random()) - 1); // Random angle from y-axis

            // Convert spherical coordinates to Cartesian
            positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta); // x
            positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta); // y
            positions[i * 3 + 2] = distance * Math.cos(phi); // z
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (points.current)
        {
            points.current.rotation.y += 0.0001;
            points.current.rotation.x += 0.0001;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                sizeAttenuation={true}
                color={0xffffff}
                transparent
                opacity={0.8}
            />
        </points>
    );
}

export default Stars;
