export const errorModule = {
  state: () => ({
    errorMessage: '',
  }),
  mutations: {
    changeMessage(state, newMessage) {
      state.errorMessage = newMessage
    },
  },
}
