import React from 'react';
import logger from 'redux-logger';
import { createStore, AnyAction, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Screen from './Screen';
import { Todo } from './api';

export type State = {
  todos: Todo[]
  theme: 'light' | 'dark'
}

let initialState: State = {
  todos: [],
  theme: 'light',
};

let store = createStore((state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'UPDATE_TODOS':
      state.todos = action.todos;
      return state;
    case 'TOGGLE_TODO_COMPLETED':
      state.todos = state.todos.map(todo => {
        if (todo === action.todo) {
          todo.completed = !todo.completed
        }
        return todo
      })
      return state
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
}, applyMiddleware(logger));

const App = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
};

export default App;
