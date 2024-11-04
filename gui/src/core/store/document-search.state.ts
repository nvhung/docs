import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const createDocumentSearchState = (state, action: PayloadAction<any>) => {
    return {
        ...state,
        ...action.payload
    }
};

const documentSearchSlice = createSlice({
    name: 'docSearch',
    initialState: {
        query: {},
        result: []
    },
    reducers: {
        createUpdateDocumentSearchAction: createDocumentSearchState
    }
});

export const {
    createUpdateDocumentSearchAction
} = documentSearchSlice.actions;

export const documentSearchReducer = documentSearchSlice.reducer;

export const selectDocumentSearch = ({docSearch}) => docSearch;
