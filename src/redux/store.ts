import {applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import settingsReducer, {SettingsState} from './settings/reducer';
import todosReducer, {TodosState} from './todos/reducer';

export type State = {
  todos: TodosState;
  settings: SettingsState;
};

export default function configureStore() {
  const store = createStore(
    combineReducers({
      settings: settingsReducer,
      todos: todosReducer,
    }),
    applyMiddleware(logger),
  );
  return store;
}
