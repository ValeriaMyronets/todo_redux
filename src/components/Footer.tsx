/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import classNames from 'classnames';
import { deleteTodo as deleteTodoApi } from '../api/todos';
import { Filtering } from '../types/Filtering';
import { useTodoState } from '../redux/useTodoState';

export const Footer = () => {
  const {
    todos,
    filtering,
    setFiltering,
    setErrorMessage,
    deleteTodo
  } = useTodoState();

  const completedTodos = todos.filter(todo => todo.completed).map(t => t.id);

  const itemsLeft = todos.reduce((acc, t) => {
    if (!t.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const handleAllChange = useCallback(() => {
    setFiltering(Filtering.ALL);
  }, []);

  const handleActiveChange = useCallback(() => {
    setFiltering(Filtering.ACTIVE);
  }, []);

  const handleCompletedChange = useCallback(() => {
    setFiltering(Filtering.COMPLETED);
  }, []);

  const handleDelete = (ids: number[]) => {
    ids.forEach(id => {
      deleteTodoApi(id)
        .then(() => deleteTodo(id))
        .catch(() => setErrorMessage('Unable to delete a todo'));
    });
  };

  const hasCompleted = todos.some((t) => t.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: Filtering.ALL === filtering },
          )}
          data-cy="FilterLinkAll"
          onClick={handleAllChange}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: Filtering.ACTIVE === filtering },
          )}
          data-cy="FilterLinkActive"
          onClick={handleActiveChange}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: Filtering.COMPLETED === filtering },
          )}
          data-cy="FilterLinkCompleted"
          onClick={handleCompletedChange}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={() => handleDelete(completedTodos)}
      >
        Clear completed
      </button>
    </footer>
  );
};
