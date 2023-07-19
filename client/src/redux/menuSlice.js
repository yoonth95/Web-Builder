import { createSlice } from '@reduxjs/toolkit';


export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: false,
    },
    reducers: {
        refreshMenu: (state, action) => {
            state.menu = action.payload;
        }
    },
});

export const { refreshMenu } = menuSlice.actions;
export default menuSlice.reducer;
