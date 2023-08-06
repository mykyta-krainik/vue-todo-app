<script setup>
import { useStore } from 'vuex'

import StatusFilter from './StatusFilter.vue'

const store = useStore()
</script>

<template>
  <footer class="footer" :class="{ 'footer--hidden': store.state.todos.todos.length === 0 }">
    <span class="footer__activeCount">
      {{ store.getters.completedTodos.length }}
      {{ store.getters.completedTodos.length === 1 ? 'task' : 'tasks' }} completed
    </span>

    <StatusFilter />

    <button
      v-show="store.getters.completedTodos.length > 0"
      class="footer__clearCompleted"
      @click="store.commit('clearCompletedTodos')"
    >
      Clear completed
    </button>
  </footer>
</template>

<style scoped lang="scss">
@import '../styles/mixins';

.footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;

  height: fit-content;

  padding: 10px 15px;

  border-top: 1px solid #e6e6e6;

  font-size: 14px;
  color: #777;
  text-align: center;

  opacity: 1;

  transition-property: opacity, width, padding;
  transition-duration: var(--transition-duration);
  transition-timing-function: ease-out;

  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);

  &--hidden {
    height: 0px;
    padding: 0;

    opacity: 0;
  }

  &__activeCount {
    justify-self: start;
  }

  &__clearCompleted {
    justify-self: end;

    margin: 0;
    padding: 0;
    border: 0;

    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    text-decoration: none;

    cursor: pointer;
    background: none;

    transition: opacity var(--transition-duration);

    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      text-decoration: none;
    }

    &--hidden {
      @include hide-smoothly;
    }
  }
}
</style>
