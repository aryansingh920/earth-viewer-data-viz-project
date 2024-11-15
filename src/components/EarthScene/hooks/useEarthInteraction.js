/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import countryService from '../../../services/api';

export function useEarthInteraction() {
    const earthRef = useRef();
    const [hoverCountry, setHoverCountry] = useState(null);
    const { camera } = useThree();

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
            const point = intersects[0].point.clone();
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
                    position: intersects[0].point
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

    return {
        earthRef,
        hoverCountry,
        handlePointerMove
    };
}
