import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import EarthScene from './components/EarthScene';
import Controls from './components/Controls';
import './App.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          style={{ background: '#000000' }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 30, 50]} />
          <EarthScene />
          <Controls />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
