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
    const [isNightMode, setIsNightMode] = useState(false);
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(false);
    // const [isNightMode, setIsNightMode] = useState(false);

    // Create a subtle blue night light color
    const nightLightColor = new THREE.Color(0x3366ff);
    const handleModeToggle = () => {
        setIsAnimating(true);
        setIsNightMode(!isNightMode);
        setTimeout(() => setIsAnimating(false), 300);
    };



    // Load textures
    // Load both textures
    const [dayTexture, nightTexture] = useLoader(TextureLoader, [
        '/textures/8k_earth_daymap.jpg',
        '/textures/8k_earth_nightmap.jpg'
    ]);

    // Create outline material for country highlighting
    const outlineMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0x00ff00) },
            glowIntensity: { value: 1.0 }
        },
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float glowIntensity;
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
                gl_FragColor = vec4(color, intensity * glowIntensity);
            }
        `,
        transparent: true,
        side: THREE.BackSide
    });

    // Handle mode toggle
    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };
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
            <ambientLight
                intensity={isNightMode ? 0.3 : 0.6}
                color={isNightMode ? nightLightColor : 0xffffff}
            />

            {/* Main directional light (sun/moon) */}
            <directionalLight
                position={[5, 3, 5]}
                intensity={isNightMode ? 0.4 : 1}
                color={isNightMode ? 0x4466ff : 0xffffff}
            />

            {/* Additional rim lighting for night mode */}
            {isNightMode && (
                <>
                    {/* Soft blue moonlight from above */}
                    <pointLight
                        position={[0, 10, 0]}
                        intensity={0.3}
                        color={0x3366ff}
                        distance={20}
                    />

                    {/* Atmospheric scatter light */}
                    <hemisphereLight
                        skyColor={0x3366ff}
                        groundColor={0x000066}
                        intensity={1}
                    />

                    {/* Subtle edge highlights */}
                    <pointLight
                        position={[-10, 0, 0]}
                        intensity={0.2}
                        color={0x3366ff}
                        distance={15}
                    />
                    <pointLight
                        position={[10, 0, 0]}
                        intensity={0.2}
                        color={0x3366ff}
                        distance={15}
                    />
                </>
            )}


            {/* Earth mesh */}
            <group>
                {/* Main Earth sphere */}
                <mesh ref={earthRef} onPointerMove={handlePointerMove}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        map={isNightMode ? nightTexture : dayTexture}
                        metalness={0.1}
                        roughness={0.8}
                    />
                </mesh>

                {/* Glow effect for highlighted country */}
                {hoverCountry && (
                    <mesh>
                        <sphereGeometry args={[1.01, 64, 64]} />
                        <shaderMaterial {...outlineMaterial} />
                    </mesh>
                )}
            </group>

            {/* Day/Night toggle button */}
            <Html fullscreen>
                <div className="earth-controls">
                    <div className="mode-button">
                        <button
                            onClick={() => setIsNightMode(!isNightMode)}
                            className="control-button"
                        >
                            <div className="button-content">
                                {isNightMode ? (
                                    <>
                                        <span className="mode-icon">☀️</span>
                                        <span className="mode-text">Day View</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="mode-icon">🌙</span>
                                        <span className="mode-text">Night View</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </Html>

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
