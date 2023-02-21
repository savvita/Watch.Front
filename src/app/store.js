import { configureStore } from "@reduxjs/toolkit";

import watchesReducer from './watchesSlice';
import producersReducer from './producersSlice';
import categoriesReducer from './categoriesSlice';
import filtersReducer from './filtersSlice';
import usersReducer from './usersSlice';
import ordersReducer from './ordersSlice';
import basketReducer from './basketSlice';

export const store = configureStore( {
    reducer: {
        watches: watchesReducer,
        producers: producersReducer,
        filters: filtersReducer,
        categories: categoriesReducer,
        users: usersReducer,
        orders: ordersReducer,
        basket: basketReducer
    }
});