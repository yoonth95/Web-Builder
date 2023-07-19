import { createSlice } from '@reduxjs/toolkit';


export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        firstList: [],
        secondList: []
    },
    reducers: {
        updateFirstList: (state, action) => {
            state.firstList = action.payload;
        },
        updateSecondList: (state, action) => {
            state.secondList = action.payload;
        },
    },
});

export const { updateFirstList, updateSecondList } = menuSlice.actions;
export default menuSlice.reducer;
