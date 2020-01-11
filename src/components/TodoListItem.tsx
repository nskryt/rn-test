import React, {useMemo} from 'react';
import {View, Text, StyleSheet, LayoutAnimation} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {Colors, Themes} from '../constants';
import CustomButton from './CustomButton';
import {Todo} from '../api';
import {toggleTodo} from '../redux/todos';

type Props = {
  todo: Todo;
};

export default function TodoListItem(props: Props) {
  const dispatch = useDispatch();
  const theme = useSelector((s: any) => s.settings.theme);
  const {todo} = props;
  const themeIsLight = theme === Themes.LIGHT;

  return (
    <View
      style={[
        styles.container,
        themeIsLight ? styles.containerLight : styles.containerDark,
      ]}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text
        style={[
          styles.status,
          todo.completed ? styles.statusCompleted : styles.statusNotCompleted,
        ]}>
        {todo.completed ? 'Completed' : 'Not completed'}
      </Text>
      <CustomButton
        text={todo.completed ? 'Uncomplete' : 'Complete'}
        style={[
          styles.toggleButton,
          todo.completed
            ? styles.toggleButtonUncomplete
            : styles.toggleButtonComplete,
        ]}
        textStyle={styles.toggleButtonText}
        onPress={() => dispatch(toggleTodo(todo.id))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
  },
  containerLight: {
    backgroundColor: Colors.WHITE,
  },
  containerDark: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  title: {
    fontSize: 18,
  },
  status: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  statusCompleted: {
    color: Colors.GREEN,
  },
  statusNotCompleted: {
    color: Colors.RED,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 3,
    marginTop: 16,
  },
  toggleButtonComplete: {
    backgroundColor: Colors.GREEN,
  },
  toggleButtonUncomplete: {
    backgroundColor: Colors.RED,
  },
  toggleButtonText: {
    padding: 0,
    color: Colors.WHITE,
  },
});
