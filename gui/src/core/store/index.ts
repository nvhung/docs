import { configureStore } from "@reduxjs/toolkit";
import { documentReducer } from "./document.state";
import { logger } from 'redux-logger';

export const store = configureStore({
    reducer: {
      document: documentReducer
    },
    middleware: (getMiddlewares) => getMiddlewares().concat(logger)
});
