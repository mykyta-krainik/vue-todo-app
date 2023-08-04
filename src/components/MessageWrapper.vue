<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update'])

function isMessageVisible(message) {
  if (message) {
    setTimeout(hideMessage, 3000)

    return true
  }

  return false
}

function hideMessage() {
  emit('update', '')
}
</script>

<template>
  <article class="message" :class="{ 'message--hidden': !isMessageVisible(message) }">
    <div class="message__header">
      <p class="message__heading">Error</p>

      <button class="message__delete" @click="hideMessage">x</button>
    </div>

    <div class="message__body">{{ props.message }}</div>
  </article>
</template>

<style scoped lang="scss">
.message {
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  background-color: #d43823;
  color: #fff;

  &--hidden {
    display: none;
  }

  &__header {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background-color: transparent;
  }

  &__heading {
    margin: 0;
  }

  &__body {
    padding: 1rem 1.25rem;

    border-radius: 0 0 8px 8px;

    font-size: 75%;

    background-color: #f17767;
  }

  &__delete {
    position: absolute;
    right: 8px;
    top: 0;
    bottom: 0;

    font-size: 120%;
    color: #fff;

    float: right;
    border: 0;
    background: none;
    cursor: pointer;

    transition: color 0.2s ease-out;

    &:hover {
      color: #aaa1a1;
    }
  }
}

.delete::before,
.delete::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 1px;
  background-color: #fff;
  transform: translate(-50%, -50%) rotate(45deg);
}

.delete::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.delete:hover::before,
.delete:hover::after {
  background-color: #dbdbdb;
}
</style>
