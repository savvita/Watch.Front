
import { createSlice } from '@reduxjs/toolkit';

export const statussesSlice = createSlice({
        name: 'statusses',
        initialState: {
            values: [{ id: 1, value: "New" }, {id: 2, value: "On progress" }, { id: 3, value: "Closed" }, {id: 4, value:  "Cancelled" }],
            status: "idle"
        },
        reducers: {
        }
    }
);

// export const {  } = producersSlice.actions

export const selectValues = (state) => state.statusses.values;

export default statussesSlice.reducer