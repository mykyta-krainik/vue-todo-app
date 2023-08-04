<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function save(status) {
  emit('update:modelValue', status)
}
</script>
<template>
  <nav class="filter">
    <a
      href="#/"
      class="filter__link"
      :class="{ 'filter__link--selected': props.modelValue === 'all' }"
      @click="save('all')"
    >
      All
    </a>

    <a
      href="#/active"
      class="filter__link"
      :class="{ 'filter__link--selected': props.modelValue === 'active' }"
      @click="save('active')"
    >
      Active
    </a>

    <a
      href="#/completed"
      class="filter__link"
      :class="{ 'filter__link--selected': props.modelValue === 'completed' }"
      @click="save('completed')"
    >
      Completed
    </a>
  </nav>
</template>

<style scoped lang="scss">
.filter {
  display: flex;

  &__link {
    margin: 3px;
    padding: 3px 7px;

    color: inherit;
    text-decoration: none;

    border: 1px solid transparent;
    border-radius: 3px;

    transition: border-color var(--transition-duration);

    &:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }

    &--selected {
      border-color: rgba(175, 47, 47, 0.2);
    }
  }
}
</style>
