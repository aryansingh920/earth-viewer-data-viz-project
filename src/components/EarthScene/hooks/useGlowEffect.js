import * as THREE from 'three';

export function useGlowEffect() {
    return new THREE.ShaderMaterial({
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
}
