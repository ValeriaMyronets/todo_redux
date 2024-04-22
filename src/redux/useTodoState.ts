import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// eslint-disable-next-line object-curly-newline
import { addTodo, 
  removeTodo, 
  setErrorMessage as ErrorMessageAction, 
  checkTodo, 
  updateTodo, 
  setLoading as LoadingAction,
  setTempTodo as setTempTodoAction,
  setFiltering as setFilteringAction,
  Filtering,
} from './todosSlice';
import { Todo } from '../types/Todo';

export const useTodoState = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const tempTodo = useSelector((state: RootState) => state.todos.tempTodo);
  const status = useSelector((state: RootState) => state.todos.status);
  const filtering = useSelector((state: RootState) => state.todos.filtering);
  const errorMessage = useSelector(
    (state: RootState) => state.todos.errorMessage);

  const dispatch = useDispatch();

  const addNewTodo = (todo: Todo) => {
    dispatch(addTodo(todo));
  };

  const toggleTodo = (todo: Todo) => {
    dispatch(checkTodo(todo.id));
  };

  const deleteTodo = (todoId: number) => {
    dispatch(removeTodo(todoId));
  };

  const updatedTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  const setErrorMessage = (error: string) => {
    dispatch(ErrorMessageAction(error));
  };

  const setLoading = (loading: boolean) => {
    dispatch(LoadingAction(loading));
  };

  const setTempTodo = (todo: Todo | null) => {
    dispatch(setTempTodoAction(todo));
  };

  const setFiltering = (filter: Filtering) => {
    dispatch(setFilteringAction(filter));
  };

  return {
    todos,
    status,
    filtering,
    tempTodo,
    errorMessage,
    addNewTodo,
    deleteTodo,
    toggleTodo,
    updatedTodo,
    setErrorMessage,
    setTempTodo,
    setLoading,
    setFiltering,
  };
};
