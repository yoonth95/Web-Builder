import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const selectBoxSlice = createSlice({
    name: 'selectBox',
    initialState,
    reducers: {
        addBlockAction: (state, action) => {
            const newBlock = {
                block_id: action.payload.block_id,
                design_type: action.payload.design_type,
                design_id: action.payload.design_id,
                block_order: action.payload.block_order
            };

            state.forEach(block => {
                if (block.block_order >= newBlock.block_order) block.block_order += 1;
            });

            state.splice(newBlock.block_order - 1, 0, newBlock);
        },
        removeBlockAction: (state, action) => {
            const blockToRemove = state.find(block => block.block_id === action.payload.block_id);
            if (!blockToRemove) return;

            const removedOrder = blockToRemove.block_order;
            state.forEach(block => {
                if (block.block_order > removedOrder) block.block_order -= 1;
            });
    
            state.filter(block => block.block_id !== action.payload.block_id);
        },
        setDesignType: (state, action) => {
            const block = state.find(block => block.block_id === action.payload.block_id);
            if(block) block.design_type = action.payload.design_type;
        },
        setDesignId: (state, action) => {
            const block = state.find(block => block.block_id === action.payload.block_id);
            if(block) block.design_id = action.payload.design_id;
        },
        setBlockOrder: (state, action) => {
            const block = state.find(block => block.block_id === action.payload.block_id);
            if(block) block.block_order = action.payload.block_order;
        },
        resetState: () => initialState,
    },
});

export const { addBlockAction, removeBlockAction, setDesignType, setDesignId, setBlockOrder, resetState } = selectBoxSlice.actions;
export default selectBoxSlice.reducer;