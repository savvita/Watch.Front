import db from '../database';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllAsync = createAsyncThunk(
    'watches/getAll',
    async () => {
      const response = await db.getAllWatches();
      return response;
    }
  );

export const getAsync = createAsyncThunk(
    'watches/get',
    async (state) => {
      const response = await db.getWatches(state);
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'watches/getbyid',
    async (state) => {
      const response = await db.getWatch(state);
      return response;
    }
  );

export const createAsync = createAsyncThunk(
    'watches/create',
    async (state) => {
      const response = await db.createWatch(state);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'watches/update',
    async (state) => {
      const response = await db.updateWatch(state);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'watches/delete',
    async (state) => {
      const response = await db.deleteWatch(state);
      return response;
    }
  );

  export const restoreAsync = createAsyncThunk(
    'watches/restore',
    async (state) => {
      const response = await db.restoreWatch(state);
      return response;
    }
  );

export const watchesSlice = createSlice({
        name: 'watches',
        initialState: {
            values: [],
            hits: 0,
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
                if(action.payload.value) {
                  state.values = action.payload.value;
                  state.hits = action.payload.hits;
                }
                else {
                    state.values = [];
                    state.hits = 0;
                }
              })
              .addCase(getAllAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAllAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload.value) {
                  state.values = action.payload.value;
                  state.hits = action.payload.hits;
                }
                else {
                    state.values = [];
                    state.hits = 0;
                }
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
              })
              .addCase(restoreAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(restoreAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(getByIdAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload.value) {
                  state.values = [ action.payload.value ];
                  state.hits = action.payload.hits;
                }
                else {
                    state.values = [];
                    state.hits = 0;
                }
              });
          },
    }
);

// export const {  } = watchesSlice.actions

export const selectValues = (state) => state.watches.values;
export const selectHits = (state) => state.watches.hits;

export default watchesSlice.reducer