<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import TodoItem from './TodoItem.vue'
import MessageWrapper from './MessageWrapper.vue'
import StatusFilter from './StatusFilter.vue'

const todos = ref([])
const title = ref('')
const status = ref('all')
const errorMessage = ref('')

const inputRef = ref(null)

const activeTodos = computed(() => todos.value.filter((todo) => !todo.completed))
const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))
const visibleTodos = computed(() => {
  switch (status.value) {
    case 'active':
      return activeTodos.value

    case 'completed':
      return completedTodos.value

    default:
      return todos.value
  }
})

onMounted(() => {
  const savedTodos = localStorage.getItem('todos') ?? '[]'

  try {
    todos.value = JSON.parse(savedTodos)
  } catch (error) {
    errorMessage.value = 'Oops! Todos can\t be loaded'
  }

  inputRef.value?.focus()
})

watch(todos, (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
})

function updateTodo({ id, title, completed }) {
  todos.value = todos.value.map((todo) => {
    if (todo.id === id) {
      return { ...todo, title, completed }
    }

    return todo
  })
}

function deleteTodo(todoId) {
  todos.value = todos.value.filter((todo) => todo.id !== todoId)
}

function clearCompletedTodos() {
  todos.value = todos.value.filter((todo) => !todo.completed)
}

function selectAllTodos() {
  if (activeTodos.value.length === 0) {
    todos.value = todos.value.map((todo) => ({ ...todo, completed: false }))

    return
  }

  todos.value = todos.value.map((todo) => ({ ...todo, completed: true }))
}

function handleSubmit() {
  if (!title.value) {
    errorMessage.value = "Oops! Todo title can't be empty"

    return
  }

  todos.value = [...todos.value, { id: Date.now(), title: title.value, completed: false }]

  title.value = ''
}
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button
          class="todoapp__toggle-all"
          :class="{ active: activeTodos.length === 0 && todos.length !== 0 }"
          @click="selectAllTodos"
        ></button>

        <form class="todoapp__form" @submit.prevent="handleSubmit">
          <input
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
            v-model="title"
            ref="inputRef"
          />
        </form>
      </header>

      <TransitionGroup name="list" tag="section" class="todoapp__main">
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo"
          @delete="deleteTodo(todo.id)"
        />
      </TransitionGroup>

      <footer class="todoapp__footer">
        <span class="todoapp__active-count"> {{ activeTodos.length }} items left </span>

        <StatusFilter v-model="status" />

        <button
          v-show="completedTodos.length > 0"
          class="todoapp__clear-completed"
          @click="clearCompletedTodos"
        >
          Clear completed
        </button>
      </footer>
    </div>

    <MessageWrapper :message="errorMessage" @update="errorMessage = $event" />
  </div>
</template>

<style scoped lang="scss">
@mixin hide-smoothly {
  pointer-events: none;

  opacity: 0;
}

.todoapp {
  margin: 40px 20px;

  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: #4d4d4d;

  &__content {
    margin-bottom: 20px;

    background: #fff;

    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  &__title {
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  &__header {
    position: relative;
  }

  &__form {
    display: flex;
  }

  &__toggle-all {
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

    &.active {
      color: #737373;
    }

    &:before {
      content: '\276f';
      transform: translateY(2px) rotate(90deg);
      line-height: 0;
    }

    &--hidden {
      @include hide-smoothly;
    }
  }

  &__new-todo {
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

  &__main {
    border-top: 1px solid #e6e6e6;
  }

  &__footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;

    box-sizing: content-box;
    height: 20px;
    padding: 10px 15px;

    font-size: 14px;

    color: #777;
    text-align: center;
    border-top: 1px solid #e6e6e6;

    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  &__clear-completed {
    margin: 0;
    padding: 0;
    border: 0;

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