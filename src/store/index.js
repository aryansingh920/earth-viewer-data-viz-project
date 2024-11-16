import { configureStore } from '@reduxjs/toolkit';
import earthControlsReducer from './slices/earthControlsSlice';
import countryDataReducer from './slices/countryDataSlice';
import uiStateReducer from './slices/uiStateSlice';
// eslint-disable-next-line no-unused-vars
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        earthControls: earthControlsReducer,
        countryData: countryDataReducer,
        uiState: uiStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // For handling Three.js objects
        }),
});

// Optional: Create custom hooks for type safety

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
