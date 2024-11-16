import { createSlice } from '@reduxjs/toolkit';

const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: {
        showGuide: true,
        showControls: true,
        showTooltip: true,
        isAnimating: false,
    },
    reducers: {
        closeGuide: (state) => {
            state.showGuide = false;
        },
        toggleControls: (state) => {
            state.showControls = !state.showControls;
        },
        toggleTooltip: (state) => {
            state.showTooltip = !state.showTooltip;
        },
        setAnimating: (state, action) => {
            state.isAnimating = action.payload;
        },
    },
});

export const {
    closeGuide,
    toggleControls,
    toggleTooltip,
    setAnimating,
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
