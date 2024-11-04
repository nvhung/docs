import { logger } from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import { documentReducer } from "./document.state";
import { documentSearchReducer } from "./document-search.state";

export const store = configureStore({
    reducer: {
      document: documentReducer,
      docSearch: documentSearchReducer
    },
    middleware: (getMiddlewares) => getMiddlewares().concat(logger)
});
