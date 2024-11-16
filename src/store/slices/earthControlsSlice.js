import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isNightMode: false,
    isRotating: true,
    isHoverEnabled: true,
    rotationSpeed: 0.001,
    zoomLevel: 1,
};

const earthControlsSlice = createSlice({
    name: 'earthControls',
    initialState,
    reducers: {
        toggleNightMode: (state) => {
            state.isNightMode = !state.isNightMode;
        },
        toggleRotation: (state) => {
            state.isRotating = !state.isRotating;
        },
        toggleHover: (state) => {
            state.isHoverEnabled = !state.isHoverEnabled;
        },
        setRotationSpeed: (state, action) => {
            state.rotationSpeed = action.payload;
        },
        setZoomLevel: (state, action) => {
            state.zoomLevel = action.payload;
        },
    },
});

export const {
    toggleNightMode,
    toggleRotation,
    toggleHover,
    setRotationSpeed,
    setZoomLevel,
} = earthControlsSlice.actions;

export default earthControlsSlice.reducer;
