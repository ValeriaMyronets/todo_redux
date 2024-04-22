/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { USER_ID } from './constants';
import { Footer } from './components/Footer';
import { ErrorComponent } from './components/ErrorComponent';
import { useTodoState } from './redux/useTodoState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { fetchTodosAsync, setLoading } from './redux/todosSlice';

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, status, setErrorMessage } = useTodoState();

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodosAsync(USER_ID));
    } else if (status === 'loading') {
      setLoading(true);
    } else if (status === 'failed') {
      setErrorMessage('Unable to load todos');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dispatch]);


  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todos.length !== 0 && (
          <Footer />
        )}
      </div>

      <ErrorComponent />
    </div>
  );
};
