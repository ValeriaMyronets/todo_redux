/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { USER_ID } from '../constants';
import { createTodo, updateTodo } from '../api/todos';
import { Todo } from '../types/Todo';
import { getNextId } from './commonFunction';
import { useTodoState } from '../redux/useTodoState';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const {
    todos,
    tempTodo,
    setTempTodo,  
    setErrorMessage,
    addNewTodo,
    toggleTodo,
  } = useTodoState();

  const todoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoInput.current?.focus();
  }, [todos.length, tempTodo]);

  const uncompletedTodos = todos
    .filter(todo => !todo.completed).map(t => t.id);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!title.trim()) {
        setErrorMessage('Title should not be empty');

        return;
      }

      todoInput.current?.setAttribute('disabled', 'true');

      const newTodo = {
        userId: USER_ID,
        title: title.trim(),
        completed: false,
      };

      setTempTodo({
        id: getNextId(todos),
        ...newTodo,
      });

      createTodo(newTodo)
        .then(
          (createdTodo: Todo) => {
            addNewTodo(createdTodo);
            setTitle('');
          },
        )
        .catch(() => setErrorMessage('Unable to add a todo'))
        .finally(() => {
          todoInput.current?.removeAttribute('disabled');
          setTempTodo(null);
        });
    });

  const handleUncompletedTodos = (ids: number[]) => {
    if (ids.length === 0) {
      todos.forEach((t) => {
        updateTodo({ ...t, completed: false })
          .then((todo: Todo) => {
            toggleTodo(todo);
          })
          .catch(() => setErrorMessage('Unable to update a todo'));
      });
    } else {
      todos.filter(t => ids.includes(t.id))
        .forEach((t) => {
          updateTodo({ ...t, completed: true })
            .then((todo: Todo) => {
              toggleTodo(todo);
            })
            .catch(() => setErrorMessage('Unable to update a todo'));
        });
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all',
            { active: todos.every(t => t.completed) })}
          data-cy="ToggleAllButton"
          onClick={() => handleUncompletedTodos(uncompletedTodos)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={todoInput}
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
