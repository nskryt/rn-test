import {UPDATE_TODOS, TOGGLE_TODO_COMPLETED} from '.';
import {Todo} from '../../api';
import {AnyAction} from 'redux';

export type TodosState = {
  items: Todo[];
  completedCount: number;
  incompletedCount: number;
};

const initialState = {
  items: [],
  completedCount: 0,
  incompletedCount: 0,
};

export default function todos(
  state: TodosState = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case UPDATE_TODOS:
      const {todos} = action.payload;
      const completed = todos.filter((t: Todo) => t.completed);
      const incompleted = todos.filter((t: Todo) => !t.completed);
      const sortedItems = [...completed, ...incompleted];
      return {
        ...state,
        items: sortedItems,
        completedCount: completed.length,
        incompletedCount: incompleted.length,
      };
    case TOGGLE_TODO_COMPLETED:
      let newCompletedCount = state.completedCount;
      let newIncompletedCount = state.incompletedCount;
      const newItems = state.items.map(todo => {
        const {completed: wasCompleted} = todo;
        if (todo.id === action.payload.todoId) {
          if (wasCompleted) {
            newCompletedCount--;
            newIncompletedCount++;
          } else {
            newCompletedCount++;
            newIncompletedCount--;
          }
          return {
            ...todo,
            completed: !wasCompleted,
          };
        }
        return todo;
      });
      return {
        ...state,
        items: newItems,
        completedCount: newCompletedCount,
        incompletedCount: newIncompletedCount,
      };
    default:
      return state;
  }
}
