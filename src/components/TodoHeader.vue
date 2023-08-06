<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const title = ref('')
const inputRef = ref(null)

onMounted(() => inputRef.value?.focus())

function handleSubmit() {
  if (!title.value) {
    store.commit('changeMessage', "Oops! Todo title can't be empty")

    return
  }

  store.commit('addTodo', title.value)

  title.value = ''
}
</script>

<template>
  <header class="header">
    <button
      class="header__toggleAll"
      :class="{
        'header__toggleAll--active':
          store.getters.activeTodos.length === 0 && store.state.todos.length !== 0,
        'header__toggleAll--hidden': store.state.todos.todos.length === 0,
      }"
      @click="store.commit('selectAllTodos')"
    ></button>

    <form class="header__form" @submit.prevent="handleSubmit">
      <input
        type="text"
        class="header__titleInput"
        placeholder="What needs to be done?"
        v-model="title"
        ref="inputRef"
      />
    </form>
  </header>
</template>

<style scoped lang="scss">
@import '../styles/mixins';

.header {
  position: relative;

  &__toggleAll {
    position: absolute;

    height: 100%;
    width: 45px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    color: #e6e6e6;

    border: 0;
    background-color: transparent;

    cursor: pointer;

    transition-property: opacity, color;
    transition-duration: var(--transition-duration);

    &--active {
      color: #737373;
    }

    &--hidden {
      @include hide-smoothly;
    }

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;

      content: '\276f';
      transform: translateX(-40%) rotate(90deg);
      line-height: 0;
    }
  }

  &__form {
    display: flex;
  }

  &__titleInput {
    width: 100%;
    padding: 16px 16px 16px 60px;

    font-size: 24px;
    line-height: 1.4em;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    border: none;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

    &::placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }

    &:focus {
      outline-color: #e6e6e6;
    }
  }
}
</style>
