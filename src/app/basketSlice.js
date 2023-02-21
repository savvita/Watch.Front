import db from '../database';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'basket/get',
    async () => {
      const response = await db.getBasket();
      return response.value;
    }
  );
  export const addAsync = createAsyncThunk(
    'basket/add',
    async (state) => {
      const response = await db.addToBasket(state);
      return response.value;
    }
  );
  export const updateAsync = createAsyncThunk(
    'basket/update',
    async (state) => {
      const response = await db.updateBasket(state);
      return response.value;
    }
  );
  export const clearAsync = createAsyncThunk(
    'basket/clear',
    async () => {
      const response = await db.deleteBasket();
      return response.value;
    }
  );

export const basketSlice = createSlice({
        name: 'basket',
        initialState: {
            value: { details: []},
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
                state.value = action.payload ?? { details: []};
              })
              .addCase(addAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(addAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(updateAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(updateAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(clearAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(clearAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

export const { } = basketSlice.actions

export const selectValue = (state) => state.basket.value;

export default basketSlice.reducer