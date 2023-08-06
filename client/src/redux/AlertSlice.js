import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: null,
    showAlert: false 
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.message = action.payload;
            state.showAlert = true;  
        },
        hideAlert: (state) => {
            state.message = null;
            state.showAlert = false;  
        }
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;