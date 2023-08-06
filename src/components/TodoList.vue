<script setup>
import { useStore } from 'vuex'

import TodoItem from './TodoItem.vue'

const store = useStore()
</script>

<template>
  <TransitionGroup name="list" tag="section" class="todoList">
    <TodoItem
      v-for="todo in store.getters.visibleTodos"
      :key="todo.id"
      :todo="todo"
      @update="store.commit('updateTodo', $event)"
      @delete="store.commit('deleteTodo', todo.id)"
    />
  </TransitionGroup>
</template>

<style scoped lang="scss">
.todoList {
  border-top: 1px solid #e6e6e6;
}

.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
