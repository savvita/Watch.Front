import db from '../database';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'producers/get',
    async () => {
      const response = await db.getProducers();
      return response.value;
    }
  );
  export const createAsync = createAsyncThunk(
    'producers/create',
    async (state) => {
      const response = await db.createProducer(state);
      return response.value;
    }
  );
  export const updateAsync = createAsyncThunk(
    'producers/update',
    async (state) => {
      const response = await db.updateProducer(state);
      return response.value;
    }
  );
  export const deleteAsync = createAsyncThunk(
    'producers/delete',
    async (state) => {
      const response = await db.deleteProducer(state);
      return response.value;
    }
  );

export const producersSlice = createSlice({
        name: 'producers',
        initialState: {
            values: [],
            status: "idle"
        },
        reducers: {
          switchChecked: (state, action) => {
              state.values = state.values.map(item => item.id !== action.payload ? item : { ...item, isChecked: !item.isChecked });
          },
          uncheckAll: (state) => {
            state.values = state.values.map(item => { return { ...item, isChecked: false } });
          }
        },
        extraReducers: (builder) => {
            builder
              .addCase(getAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.values = action.payload.map(item => { return { id: item.key.id, value: item.key.producerName, count: item.value, isChecked: false} });
              })
              .addCase(createAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(createAsync.fulfilled, (state, action) => {
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
              .addCase(deleteAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

export const { switchChecked, uncheckAll } = producersSlice.actions

export const selectValues = (state) => state.producers.values;

export default producersSlice.reducer