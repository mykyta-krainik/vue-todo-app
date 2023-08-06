import { createStore } from 'vuex'
import { todosModule } from './modules/todosModule'
import { statusModule } from './modules/statusModule'
import { errorModule } from './modules/errorModule'

export default createStore({
  modules: {
    todos: todosModule,
    status: statusModule,
    error: errorModule,
  },
})
