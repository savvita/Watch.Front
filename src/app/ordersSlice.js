import db from '../database';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'orders/get',
    async (state) => {
      const response = await db.getOrders(state);
      return response.value;
    }
  );
  export const getByIdAsync = createAsyncThunk(
    'orders/getbyid',
    async (state) => {
      const response = await db.getOrderById(state);
      return response.value;
    }
  );
  export const createAsync = createAsyncThunk(
    'orders/create',
    async () => {
      const response = await db.order();
      return response.value;
    }
  );
  export const closeAsync = createAsyncThunk(
    'orders/close',
    async (state) => {
      const response = await db.closeOrder(state);
      return response.value;
    }
  );
  export const cancelAsync = createAsyncThunk(
    'orders/cancel',
    async (state) => {
      const response = await db.cancelOrder(state);
      return response.value;
    }
  );

export const ordersSlice = createSlice({
        name: 'orders',
        initialState: {
            values: [],
            status: "idle"
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
              .addCase(getAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload) {
                  state.values = action.payload;
                }
                else {
                    state.values = [];
                }
              })
              .addCase(getByIdAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload) {
                  state.values = [ action.payload ];
                }
                else {
                    state.values = [];
                }
              })
              .addCase(createAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(createAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(cancelAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(cancelAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(closeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(closeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

export const { } = ordersSlice.actions

export const selectValues = (state) => state.orders.values;

export default ordersSlice.reducer