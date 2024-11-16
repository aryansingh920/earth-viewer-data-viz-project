import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import countryService from '../../services/api';

export const fetchCountryData = createAsyncThunk(
    'countryData/fetchCountryData',
    async (coordinates) => {
        const response = await countryService.detectCountry(coordinates);
        return response;
    }
);

const countryDataSlice = createSlice({
    name: 'countryData',
    initialState: {
        hoveredCountry: null,
        countryDetails: {},
        loading: false,
        error: null,
    },
    reducers: {
        setHoveredCountry: (state, action) => {
            state.hoveredCountry = action.payload;
        },
        clearCountryData: (state) => {
            state.hoveredCountry = null;
            state.countryDetails = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountryData.fulfilled, (state, action) => {
                state.loading = false;
                state.hoveredCountry = action.payload;
                if (action.payload?.name)
                {
                    state.countryDetails[action.payload.name] = action.payload.data;
                }
            })
            .addCase(fetchCountryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch country data';
            });
    },
});

export const { setHoveredCountry, clearCountryData } = countryDataSlice.actions;
export default countryDataSlice.reducer;
