import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from "../features/auth/authSlice"
import employees from "../features/employees/employeesSlice"
import {api} from "./services/api"
import { listenerMiddleware } from '../middleware/auth.middleware';


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    employees
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
