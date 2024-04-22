import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
