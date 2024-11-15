import React from 'react';
import { OrbitControls } from '@react-three/drei';

function Controls() {
    return (
        <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={0}
            maxDistance={3}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
        />
    );
}

export default Controls;
