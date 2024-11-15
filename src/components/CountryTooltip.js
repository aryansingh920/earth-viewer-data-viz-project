import { Html } from '@react-three/drei';
import React from 'react';

function CountryTooltip({ country }) {
    return (
        <Html
            position={[
                country.position.x * 1.2,
                country.position.y * 1.2,
                country.position.z * 1.2
            ]}
            style={{
                pointerEvents: 'none',
                transform: 'translate3d(-50%, -50%, 0)'
            }}
        >
            <div className="earth-tooltip">
                <div className="country-name">{country.name}</div>
                <div className="coordinates">
                    <span>{Math.abs(country.lat).toFixed(2)}°{country.lat >= 0 ? 'N' : 'S'}</span>
                    <span>{Math.abs(country.lon).toFixed(2)}°{country.lon >= 0 ? 'E' : 'W'}</span>
                </div>
            </div>
        </Html>
    );
}

export default CountryTooltip;
