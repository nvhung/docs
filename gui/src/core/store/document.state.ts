import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const createDocumentState = (state, action: PayloadAction<any>) => action.payload;

const documentSlice = createSlice({
    name: 'document',
    initialState: {
    },
    reducers: {
        createUpdateDocumentAction: createDocumentState
    }
});

export const {
    createUpdateDocumentAction
} = documentSlice.actions;

export const documentReducer = documentSlice.reducer;

export const selectDocument = ({document}) => document;
