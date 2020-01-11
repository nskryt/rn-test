import {Todo} from '../../api';

export const UPDATE_TODOS = 'test/todo/UPDATE_TODOS';
export const TOGGLE_TODO_COMPLETED = 'test/todo/TOGGLE_TODO_COMPLETED';

export function updateTodos(todos: Todo[]) {
  return {
    type: UPDATE_TODOS,
    payload: {
      todos,
    },
  };
}

export function toggleTodo(todoId: Todo['id']) {
  return {
    type: TOGGLE_TODO_COMPLETED,
    payload: {
      todoId,
    },
  };
}
