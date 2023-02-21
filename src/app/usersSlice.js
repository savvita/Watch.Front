import db from '../database';

import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'users/get',
    async () => {
      const response = await db.getUsers();
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'users/update',
    async (state) => {
      const response = await db.updateUser(state);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'users/delete',
    async (state) => {
      const response = await db.deleteUser(state);
      return response;
    }
  );

export const usersSlice = createSlice({
        name: 'users',
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

                if(action.payload.value) {
                    state.values = action.payload.value;
                }
                else {
                    state.values = [];
                }
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

export const { } = usersSlice.actions

export const selectValues = (state) => state.users.values;

export default usersSlice.reducer