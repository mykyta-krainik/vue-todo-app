export const statusModule = {
  state: () => ({
    status: 'all',
  }),
  mutations: {
    changeStatus(state, newStatus) {
      state.status = newStatus
    },
  },
}
