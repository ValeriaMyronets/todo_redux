/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

export enum Filtering {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
} 

const prevState = localStorage.getItem('todosState');

function saveTodoState(state: TodosState) {
  localStorage.setItem('todosState', JSON.stringify(state));
}

export interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filtering: Filtering;
  loading: boolean;
  errorMessage: string;
  tempTodo: Todo | null;
}

const initialState: TodosState = prevState ? JSON.parse(prevState) : {
  todos: [],
  status: 'idle',
  error: null,
  filtering: Filtering.ALL,
  loading: false,
  errorMessage: '',
  tempTodo: null,
};

export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos',
  async (userId: number) => {
    try {
      const response = await getTodos(userId);

      return response;
    } catch (error) {
      throw error;
    }
  }
);

const todosSlice = createSlice({
  name: 'todoState',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);

      saveTodoState(state);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);

      saveTodoState(state);
    },
    checkTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }

      saveTodoState(state);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);

      if (todo) {
        todo.title = action.payload.title;
        todo.completed = action.payload.completed;
      }

      saveTodoState(state);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      saveTodoState(state);
    },
    setFiltering(state, action: PayloadAction<Filtering>) {   
      state.filtering = action.payload;
      saveTodoState(state);
    },
    setTempTodo(state, action: PayloadAction<Todo | null>) {  
      state.tempTodo = action.payload;
      saveTodoState(state);
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      saveTodoState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {
  addTodo,
  removeTodo,
  checkTodo,
  updateTodo,
  setLoading, 
  setFiltering,
  setTempTodo,
  setErrorMessage,
} = todosSlice.actions;

export default todosSlice.reducer;
