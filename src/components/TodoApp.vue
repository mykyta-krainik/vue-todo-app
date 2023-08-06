<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useStore } from 'vuex'

import MessageWrapper from './MessageWrapper.vue'
import TodoList from './TodoList.vue'
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'

const store = useStore()
const unsubscribe = ref(null)

onBeforeMount(() => {
  store.dispatch('initialiseTodos')

  unsubscribe.value = store.subscribe((mutation, { todos }) => {
    if (mutation.type.toLowerCase().includes('todo')) {
      localStorage.setItem('todos', JSON.stringify(todos.todos))
    }
  })
})

onBeforeUnmount(() => {
  unsubscribe()
})
</script>

<template>
  <div class="todoApp">
    <h1 class="todoApp__title">Todo App</h1>

    <div class="todoApp__content">
      <TodoHeader />

      <TodoList />

      <TodoFooter />
    </div>

    <MessageWrapper
      :message="store.state.error.errorMessage"
      @update="store.commit('changeMessage', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.todoApp {
  margin: 40px 20px;

  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: #4d4d4d;

  &__title {
    margin-bottom: 40px;

    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  &__content {
    margin-bottom: 20px;

    background: #fff;

    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>