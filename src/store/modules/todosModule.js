export const todosModule = {
  state: () => ({
    todos: [],
  }),
  getters: {
    activeTodos(state) {
      return state.todos.filter((todo) => !todo.completed)
    },
    completedTodos(state) {
      return state.todos.filter((todo) => todo.completed)
    },
    visibleTodos(state, getters, rootState) {
      switch (rootState.status.status) {
        case 'active':
          return getters.activeTodos

        case 'completed':
          return getters.completedTodos

        default:
          return state.todos
      }
    },
  },
  mutations: {
    addTodo(state, title) {
      state.todos = [...state.todos, { id: Date.now(), title, completed: false }]
    },
    updateTodo(state, { id, title, completed }) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title, completed }
        }

        return todo
      })
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId)
    },
    clearCompletedTodos(state) {
      state.todos = state.todos.filter((todo) => !todo.completed)
    },
    selectAllTodos(state) {
      const activeTodosNum = state.todos.filter((todo) => !todo.completed).length

      if (activeTodosNum === 0) {
        state.todos = state.todos.map((todo) => ({ ...todo, completed: false }))

        return
      }

      state.todos = state.todos.map((todo) => ({ ...todo, completed: true }))
    },
  },
  actions: {
    initialiseTodos(context) {
      const savedTodos = localStorage.getItem('todos') ?? '[]'

      try {
        const todos = JSON.parse(savedTodos)

        context.state.todos = todos
      } catch (error) {
        context.commit('changeMessage', "Oops! Todos can't be loaded")
      }
    },
  },
}
