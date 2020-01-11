import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';

import api from '../../api';
import {updateTodos} from '../../redux/todos';
import {toggleTheme} from '../../redux/settings';
import TodoListItem from '../../components/TodoListItem';
import CustomButton from '../../components/CustomButton';
import {State} from '../../redux/store';

export default function TodoList() {
  const [loading, setLoading] = useState(true);
  const {items: todoItems, completedCount, incompletedCount} = useSelector(
    (s: State) => s.todos,
  );
  const dispatch = useDispatch();

  function loadTodos() {
    setLoading(true);
    api.loadTodos().then(todos => {
      dispatch(updateTodos(todos));
      setLoading(false);
    });
  }

  useEffect(loadTodos, []);
  const initialLoading = loading && !todoItems.length;
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        withWrapper
        text="Toggle theme"
        onPress={() => dispatch(toggleTheme())}
      />
      <Text style={styles.countText}>
        Completed count: {initialLoading ? '?' : completedCount}
        {'\n'}
        Incompleted count: {initialLoading ? '?' : incompletedCount}
      </Text>
      <FlatList
        data={todoItems}
        style={styles.flatList}
        refreshControl={
          <RefreshControl onRefresh={loadTodos} refreshing={loading} />
        }
        renderItem={({item: todo}) => <TodoListItem todo={todo} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  countText: {
    margin: 24,
    lineHeight: 41,
  },
});
