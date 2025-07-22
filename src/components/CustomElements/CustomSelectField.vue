<script setup lang="ts">
import { EnumProgress } from '@/types/dealsType'
import { ref } from 'vue'
import SelectCustomIcon from '../Icons/SelectCustomIcon.vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: EnumProgress): void
}>()

const options = [
  { label: 'New', value: EnumProgress.new },
  { label: 'In check', value: EnumProgress.checking },
  { label: 'In Progress', value: EnumProgress['in-progress'] },
  { label: 'Done', value: EnumProgress.done },
]
const selected = ref(EnumProgress.new)
const isOpen = ref(false)

const toggleDrop = () => {
  isOpen.value = !isOpen.value
}

const selectedOption = (value: EnumProgress) => {
  selected.value = value
  isOpen.value = false
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="select">
    <button class="select__btn" @click="toggleDrop">
      {{ options.find((opt) => opt.value === selected)?.label }}
      <SelectCustomIcon />
    </button>

    <ul class="select__dropdown" v-show="isOpen">
      <li
        class="select__item"
        v-for="option in options"
        :key="option.value"
        :class="{ active: option.value === selected }"
        @click="selectedOption(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.select {
  position: relative;
  width: 172px;
  &__btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
    background-color: $gray-10;
    border: 1px solid $gray-30;
    border-radius: 8px;
    font-size: 18px;
    color: $gray-70;
    cursor: pointer;
    text-align: left;
  }
  &__dropdown {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: $gray-10;
    border: 1px solid $gray-30;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    list-style: none;
  }

  &__item {
    font-weight: 500;
    padding: 10px 20px;
    padding-bottom: 10px;
    cursor: pointer;
    font-size: 18px;
    color: $gray-70;
    font-size: 18px;
    &:hover {
      background-color: $gray-50;
    }
  }
}
</style>
