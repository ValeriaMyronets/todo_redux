import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import {
  deleteTodo as deleteTodoApi,
  updateTodo as updateTodoApi
} from '../api/todos';
import { EditForm } from './EditForm';
import { useTodoState } from '../redux/useTodoState';

interface Props {
  todo: Todo
  isLoading?: boolean
}

export const TodoItem: React.FC<Props> = ({ todo, isLoading }) => {
  const { setErrorMessage, deleteTodo, toggleTodo } = useTodoState();
  const [loading, setLoading] = useState(isLoading);
  const [editMode, setEditMode] = useState(false);

  const { id, title, completed } = todo;

  const handleDeleteTodo = (todoId: number) => {
    setLoading(true);

    deleteTodoApi(todoId)
      .then(() => deleteTodo(todoId))
      .catch(() => setErrorMessage('Unable to delete a todo'))
      .finally(() => setLoading(false));
  };

  const handleUpdateTodo = (editingCompleted: boolean) => {
    setLoading(true);
 
    updateTodoApi({ id, completed: editingCompleted, title })
      .then((t) => {
        toggleTodo(t);
      })
      .catch(() => setErrorMessage('Unable to update a todo'))
      .finally(() => setLoading(false));
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { 'completed': completed },
      )}
      onDoubleClick={() => {
        setEditMode(true);
      }}
    >
      <div 
        className="todo__status-label" 
        onClick={() => handleUpdateTodo(!completed)}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {}}
        />
      </div>

      {!editMode ? (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              handleDeleteTodo(id);
            }}
          >
            ×
          </button>
        </>
      ) : (
        <EditForm
          todo={todo}
          onEditMode={setEditMode}
          setLoading={setLoading}
        />
      )}

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal overlay',
          { 'is-active': loading },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
