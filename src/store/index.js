import { configureStore } from '@reduxjs/toolkit';
import earthControlsReducer from './slices/earthControlsSlice';
import countryDataReducer from './slices/countryDataSlice';
import uiStateReducer from './slices/uiStateSlice';

export const store = configureStore({
    reducer: {
        earthControls: earthControlsReducer,
        countryData: countryDataReducer,
        uiState: uiStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
