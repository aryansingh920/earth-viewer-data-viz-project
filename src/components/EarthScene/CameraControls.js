import React from 'react';
import { OrbitControls } from '@react-three/drei';

function CameraControls() {
    return (
        <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.1}
            panSpeed={0.3}
            rotateSpeed={0.5}
            minDistance={1.6}  // Minimum zoom distance (closer to Earth)
            maxDistance={2}   // Maximum zoom distance
            // For smoother camera movement
            enableDamping={true}
            dampingFactor={0.05}
            // Optional: restrict vertical rotation
            minPolarAngle={Math.PI / 4}   // Limit how high you can orbit
            maxPolarAngle={Math.PI * 3 / 4}  // Limit how low you can orbit
        />
    );
}

export default CameraControls;
