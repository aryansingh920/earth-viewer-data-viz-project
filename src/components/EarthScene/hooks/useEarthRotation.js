import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export function useEarthRotation(earthRef) {
    const [isNightMode, setIsNightMode] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isRotating, setIsRotating] = useState(true);

    // Handle rotation controls
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

    // Initial rotation setup
    useEffect(() => {
        if (earthRef.current)
        {
            earthRef.current.rotation.x = 0;
            earthRef.current.rotation.y = -Math.PI / 2;
            earthRef.current.rotation.z = 0;
        }
    }, [earthRef]);

    // Continuous rotation
    // useFrame(() => {
    //     if (earthRef.current && isRotating)
    //     {
    //         earthRef.current.rotation.y += 0.001;
    //     }
    // });

    // Handle mode toggle with animation
    const handleModeToggle = () => {
        setIsAnimating(true);
        setIsNightMode(prev => !prev);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return {
        isNightMode,
        setIsNightMode,
        isAnimating,
        isRotating,
        handleModeToggle
    };
}
