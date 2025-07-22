<script setup lang="ts">
import type { TOptions } from '@/types/dealsType'
import { computed, ref } from 'vue'
import SelectCustomIcon from '../Icons/SelectCustomIcon.vue'

const props = defineProps<{
  modelValue: string
  options: TOptions[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedOption = (value: string) => {
  isOpen.value = false
  emit('update:modelValue', value)
}

const isOpen = ref(false)
const currentLabel = computed(() => props.options.find((opt) => opt.value === props.modelValue)?.label ?? '')
</script>

<template>
  <div class="sorted">
    <button class="sorted__btn" @click="isOpen = !isOpen">Sort by: {{ currentLabel }} <SelectCustomIcon /></button>
    <ul class="sorted__dropdown" v-show="isOpen">
      <li
        class="sorted__item"
        v-for="option in props.options"
        :key="option.value"
        @click="selectedOption(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.sorted {
  @include flexbox-column;
  &__btn {
    display: flex;
    align-items: center;
    @include def-btn;
    color: $navy;
    padding: 10px;
    font-size: 16px;
    border-radius: 70px;
    &:hover {
      outline: 1px solid $gray-90;
    }
  }
  &__dropdown {
    margin: 0;
    padding: 0;
    list-style: none;
    & > .sorted__item {
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
      padding: 5px;
      color: $navy;
      font-size: 16px;
      border-radius: 70px;
      transition: 0.2s ease-in-out;
      &:hover {
        background-color: $gray-50;
      }
      &:focus {
        outline: 1px solid $gray-90;
      }
      &:active {
        background-color: $gray-70;
        color: $colorwhite;
      }
    }
  }
}
</style>
