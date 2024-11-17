import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export function useEarthRotation(earthRef, leftSidebarOpen, rightSidebarOpen) {
    const [isNightMode, setIsNightMode] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    // Handle user interaction disabling rotation
    useEffect(() => {
        const handlePointerDown = () => setIsRotating(false);
        const handlePointerUp = () => {
            if (!leftSidebarOpen && !rightSidebarOpen) setIsRotating(true);
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointerleave', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointerleave', handlePointerUp);
        };
    }, [leftSidebarOpen, rightSidebarOpen]);

    // Initial rotation setup
    useEffect(() => {
        if (earthRef.current)
        {
            earthRef.current.rotation.x = 0;
            earthRef.current.rotation.y = -Math.PI / 2;
            earthRef.current.rotation.z = 0;
        }
    }, [earthRef]);

    // Continuous rotation based on conditions
    useFrame(() => {
        if (earthRef.current && isRotating && !leftSidebarOpen && !rightSidebarOpen)
        {
            earthRef.current.rotation.y += 0.001;
        }
    });

    // Handle mode toggle with animation
    const handleModeToggle = () => {
        setIsNightMode(prev => !prev);
    };

    return {
        isNightMode,
        setIsNightMode,
        isRotating,
        setIsRotating,
        handleModeToggle
    };
}
