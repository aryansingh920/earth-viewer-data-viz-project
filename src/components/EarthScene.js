import React, { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
// eslint-disable-next-line no-unused-vars
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import Stars from './Stars';
import countryService from '../services/api';
import CountryTooltip from './CountryTooltip';
function EarthScene() {
    const earthRef = useRef();
    // eslint-disable-next-line no-unused-vars
    const [isRotating, setIsRotating] = useState(true);
    const [hoverCountry, setHoverCountry] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [majorCountries, setMajorCountries] = useState(null);
    const { camera } = useThree();

    // Load textures
    const earthTexture = useLoader(TextureLoader, '/textures/8k_earth_daymap.jpg');

    // Fetch major countries data
    useEffect(() => {
        const fetchMajorCountries = async () => {
            const data = await countryService.getMajorCountries();
            setMajorCountries(data);
        };
        fetchMajorCountries();
    }, []);

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

    const handlePointerMove = async (e) => {
        if (!earthRef.current) return;

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(earthRef.current);

        if (intersects.length > 0)
        {
            // Get intersection point in world coordinates
            const point = intersects[0].point.clone();
            // Apply Earth's current rotation to get the correct coordinates
            const worldMatrix = earthRef.current.matrixWorld;
            point.applyMatrix4(worldMatrix);

            const countryData = await countryService.detectCountry({
                x: point.x,
                y: point.y,
                z: point.z
            });

            if (countryData)
            {
                setHoverCountry({
                    ...countryData,
                    position: intersects[0].point // Use original intersection point for display
                });
            } else
            {
                setHoverCountry(null);
            }
        } else
        {
            setHoverCountry(null);
        }
    };

    // Initial setup
    useEffect(() => {
        if (earthRef.current)
        {
            // Set initial rotation to match the texture map orientation
            earthRef.current.rotation.x = 0;
            earthRef.current.rotation.y = -Math.PI / 2; // Rotate 90 degrees to align with map
            earthRef.current.rotation.z = 0;
        }
    }, []);

    // Continuous rotation
    useFrame(() => {
        if (earthRef.current && isRotating)
        {
            // earthRef.current.rotation.y += 0.001;
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
                className="earth-mesh"
            >
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={earthTexture}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {hoverCountry && <CountryTooltip country={hoverCountry} />}

            <Stars />
        </>
    );
}

// Separate component for the tooltip
// function CountryTooltip({ country }) {
//     return (
//         <Html
//             position={[
//                 country.position.x * 1.2,
//                 country.position.y * 1.2,
//                 country.position.z * 1.2
//             ]}
//             style={{
//                 pointerEvents: 'none',
//                 transform: 'translate3d(-50%, -50%, 0)'
//             }}
//         >
//             <div className="country-tooltip">
//                 <h3>{country.name}</h3>
//                 {country.is_major && <span className="major-badge">Major Country</span>}
//                 <div className="coordinates">
//                     <div>Lat: {country.lat.toFixed(2)}°</div>
//                     <div>Lon: {country.lon.toFixed(2)}°</div>
//                 </div>
//             </div>
//         </Html>
//     );
// }

export default EarthScene;
