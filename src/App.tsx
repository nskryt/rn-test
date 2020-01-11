import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './redux/store';
import TodoList from './screens/TodoList';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
