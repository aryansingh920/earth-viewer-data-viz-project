import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import EarthScene from './components/EarthScene';
import Controls from './components/Controls';
import './App.css';

function App() {
  const [showGuide, setShowGuide] = useState(true);

  // const closeGuide = () => {
  //   setShowGuide(false);
  // };

  useEffect(() => { }, [showGuide]);

  return (
    <div className="App">
      {showGuide && (
        <div className="usage-guide">
          <div className="guide-content">
            <h3>Usage Guide</h3>
            <p>💡 You can:</p>
            <ul>
              <li>Zoom in and out to explore the Earth.</li>
              <li>Rotate the Earth by clicking and dragging.</li>
              <li>Hover over countries to see their names.</li>
            </ul>
            {/* <button className="close-button" onClick={closeGuide}>
              ✖ Close
            </button> */}
          </div>
        </div>
      )}

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
