import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, RefreshControl, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { State } from './App';
import api, { Todo } from './api';

type ScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

type ScreenState = {
  loading: boolean
}

const mapStateToProps = (state: State) => ({
  todos: state.todos,
  theme: state.theme,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTodos: todos => dispatch({ type: 'UPDATE_TODOS', todos }),
  completeTodo: (todo: Todo) => dispatch({ type: 'TOGGLE_TODO_COMPLETED', todo }),
  toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
})

class Screen extends React.Component<ScreenProps, ScreenState> {
  state = {
    loading: true,
  }

  constructor(props) {
    super(props)
    api
      .loadTodos()
      .then(todos => {
        this.props.updateTodos(todos);
        this.setState({ loading: false });
      });
  }

  render() {
    let completed = this.props.todos.filter(x => x.completed);
    let incompleted = this.props.todos.filter(x => !x.completed);
    let sorted = completed.concat(incompleted);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.props.toggleTheme()}>
          <Text style={{ borderRadius: 4, margin: 24, padding: 8, backgroundColor: '#cae', alignSelf: 'stretch', textAlign: 'center' }}>Toogle theme</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 24 }}>Completed count: {completed.length}</Text>
        <Text style={{ margin: 24 }}>Incompleted count: {incompleted.length}</Text>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={<RefreshControl onRefresh={() => this.refresh()} refreshing={this.state.loading} />}>
          {sorted.map((todo: Todo, i: number) => {
            return todo.completed
              ? (
                <View style={{ padding: 24, borderBottomWidth: 1, borderBottomColor: "#BDBDBD", backgroundColor: this.props.theme === 'light' ? 'white' : '#ECEFF1' }}>
                  <Text style={{ fontSize: 18 }}>{todo.title}</Text>
                  <Text style={{ marginTop: 16, color: '#43A047', fontWeight: 'bold' }}>Completed</Text>
                  <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 10, borderRadius: 3, marginTop: 16, backgroundColor: '#FF5722' }} onPress={() => this.props.completeTodo(todo)}>
                    <Text style={{ color: 'white' }}>Uncomplete</Text>
                  </TouchableOpacity>
                </View>
              )
              : (
                <View style={{ padding: 24, borderBottomWidth: 1, borderBottomColor: "#BDBDBD", backgroundColor: this.props.theme === 'light' ? 'white' : '#ECEFF1' }}>
                  <Text style={{ fontSize: 18 }}>{todo.title}</Text>
                  <Text style={{ marginTop: 16, color: '#FF5722', fontWeight: 'bold' }}>Not completed</Text>
                  <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 10, borderRadius: 3, marginTop: 16, backgroundColor: '#43A047' }} onPress={() => this.props.completeTodo(todo)}>
                    <Text style={{ color: 'white' }}>Complete</Text>
                  </TouchableOpacity>
                </View>
              )
          })}
        </ScrollView>
      </SafeAreaView>
    )
  }

  async refresh() {
    this.setState({ loading: true });
    let todos = await api.loadTodos();
    this.props.updateTodos(todos);
    this.setState({ loading: false });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
