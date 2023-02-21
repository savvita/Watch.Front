import db from '../database';

import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        values: {
            page: 1,
            perPage: 2,
            producers: [],
            categories: [],
            model: '',
            minPrice: null,
            maxPrice: null,
            isPopular: null,
            isOnSale: true
        }
    },
    reducers: {
        setProducers: (state, action) => {
            state.values.producers = action.payload.filter(item => item.isChecked);
        },

        setCategories: (state, action) => {
            state.values.categories = action.payload.filter(item => item.isChecked);
        },

        setPage: (state, action) => {
            state.values.page = action.payload;
        },

        incrementPage: (state) => {
            state.values.page += 1;
        },

        decrementPage: (state) => {
            state.values.page -= 1;
        },

        setMinPrice: (state, action) => {
            state.values.minPrice = action.payload;
        },

        setMaxPrice: (state, action) => {
            state.values.maxPrice = action.payload;
        },

        setModel: (state, action) => {
            state.values.model = action.payload;
        }
    }
});

export const { setProducers, setCategories, setPage, incrementPage, decrementPage, setMinPrice, setMaxPrice, setModel } = filtersSlice.actions

export const selectValues = (state) => state.filters.values;
export const selectPage = (state) => state.filters.values.page;
export const selectPerPage = (state) => state.filters.values.perPage;
export const selectMinPrice = (state) => state.filters.values.minPrice;
export const selectMaxPrice = (state) => state.filters.values.maxPrice;
export const selectModel = (state) => state.filters.values.model;

export default filtersSlice.reducer