import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import Stars from './Stars';

function EarthScene() {
    const earthRef = useRef();
    const [isRotating, setIsRotating] = useState(true);
    const [hoverCountry, setHoverCountry] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [majorCountries, setMajorCountries] = useState(null);
    const { camera } = useThree();

    // Load textures
    const earthTexture = useLoader(TextureLoader, '/textures/8k_earth_daymap.jpg');

    useEffect(() => {
        // Fetch major countries data on component mount
        fetch('http://localhost:8000/major-countries')
            .then(response => response.json())
            .then(data => setMajorCountries(data))
            .catch(error => console.error('Error fetching major countries:', error));
    }, []);

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

    const handlePointerMove = async (event) => {
        if (!earthRef.current) return;

        event.preventDefault();

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(earthRef.current);

        if (intersects.length > 0)
        {
            const point = intersects[0].point;

            try
            {
                const response = await fetch('http://localhost:8000/detect-country', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        x: point.x,
                        y: point.y,
                        z: point.z
                    })
                });

                const data = await response.json();
                if (data)
                {
                    setHoverCountry({
                        ...data,
                        position: point
                    });
                } else
                {
                    setHoverCountry(null);
                }
            } catch (error)
            {
                console.error('Error detecting country:', error);
            }
        } else
        {
            setHoverCountry(null);
        }
    };

    useFrame(() => {
        if (earthRef.current && isRotating)
        {
            earthRef.current.rotation.y += 0.001;
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 3, 5]} intensity={1} color={0xffffff} />
            <directionalLight position={[-5, -3, -5]} intensity={0.8} color={0xffffff} />
            <pointLight position={[0, 10, 0]} intensity={0.5} color={0xffffff} />
            <pointLight position={[0, -10, 0]} intensity={0.5} color={0xffffff} />
            <pointLight position={[10, 0, 0]} intensity={0.3} color={0xccccff} />
            <pointLight position={[-10, 0, 0]} intensity={0.3} color={0xccccff} />

            <mesh
                ref={earthRef}
                onPointerMove={handlePointerMove}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={earthTexture}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {hoverCountry && (
                <Html
                    position={[
                        hoverCountry.position.x * 1.2,
                        hoverCountry.position.y * 1.2,
                        hoverCountry.position.z * 1.2
                    ]}
                    style={{
                        pointerEvents: 'none',
                        transform: 'translate3d(-50%, -50%, 0)'
                    }}
                >
                    <div className="country-tooltip">
                        <h3>{hoverCountry.name}</h3>
                        {hoverCountry.is_major && <span className="major-badge">Major Country</span>}
                        <div className="coordinates">
                            <div>Lat: {hoverCountry.lat.toFixed(2)}°</div>
                            <div>Lon: {hoverCountry.lon.toFixed(2)}°</div>
                        </div>
                    </div>
                </Html>
            )}

            <Stars />
        </>
    );
}

export default EarthScene;
