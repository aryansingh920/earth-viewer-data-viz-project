import React from 'react';
import { Canvas } from '@react-three/fiber';
import EarthScene from './components/EarthScene';
import Controls from './components/Controls';
import './App.css';

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: '#000000' }}
      >
        <EarthScene />
        <Controls />
      </Canvas>
    </div>
  );
}

export default App;
