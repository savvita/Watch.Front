import db from '../database';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'categories/getAll',
    async () => {
      const response = await db.getCategories();
      return response.value;
    }
  );

  export const createAsync = createAsyncThunk(
    'categories/create',
    async (state) => {
      const response = await db.createCategory(state);
      return response.value;
    }
  );

  export const updateAsync = createAsyncThunk(
    'categories/update',
    async (state) => {
      const response = await db.updateCategory(state);
      return response.value;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'categories/delete',
    async (state) => {
      const response = await db.deleteCategory(state);
      return response.value;
    }
  );

export const categoriesSlice = createSlice({
        name: 'categories',
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
                state.values = action.payload.map(item => { return { id: item.key.id, value: item.key.categoryName, count: item.value, isChecked: false} });
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

export const { switchChecked, uncheckAll } = categoriesSlice.actions

export const selectValues = (state) => state.categories.values;

export default categoriesSlice.reducer