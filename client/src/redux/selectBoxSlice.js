import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    btnToggle: false,
    type: 'image',
    id: 0,
};

export const selectBoxSlice = createSlice({
    name: 'selectBox',
    initialState,
    reducers: {
        setBtnToggle: (state, action) => {
            state.btnToggle = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        resetState: state => initialState,
    },
});

export const { setBtnToggle, setType, setId, resetState } = selectBoxSlice.actions;
export default selectBoxSlice.reducer;