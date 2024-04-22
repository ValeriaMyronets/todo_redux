import React from 'react';
import { TodoItem } from './TodoItem';
import { Filtering } from '../types/Filtering';
import { useTodoState } from '../redux/useTodoState';

export const TodoList: React.FC = () => {
  const { filtering, tempTodo } = useTodoState();

  const { todos } = useTodoState();

  const visibleTodos = (currentFiltering: Filtering) => {
    switch (currentFiltering) {
      case Filtering.ACTIVE:
        return todos.filter((t) => !t.completed);
      case Filtering.COMPLETED:
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos(filtering).map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}

      {tempTodo !== null && (
        <TodoItem todo={tempTodo} key={tempTodo.id} isLoading />
      )}
    </section>
  );
};
