export default {
  loadTodos: async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return await response.json() as Todo[];
  },
};

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}
