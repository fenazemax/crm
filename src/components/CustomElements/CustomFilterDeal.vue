<script setup lang="ts">
import { ref } from 'vue'
import FilterBtnIcon from '../Icons/FilterBtnIcon.vue'
import { EnumProgress, type TOptions } from '@/types/dealsType'

const modelValue = defineModel<string | null>()

const isOpen = ref(false)

const statusOption: TOptions[] = [
  { value: 'all', label: 'All' },
  ...Object.entries(EnumProgress).map(([, label]) => ({
    value: label,
    label,
  })),
]

const selectStatus = (status: string) => {
  modelValue.value = status
  isOpen.value = false
}
</script>

<template>
  <div class="filter">
    <button class="filter__descr" @click="isOpen = !isOpen">Filter <FilterBtnIcon /></button>
    <ul class="filter__dropdown" v-if="isOpen">
      <li class="filter__item" v-for="option in statusOption" :key="option.value" @click="selectStatus(option.value)">
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.filter {
  @include flexbox-column;
  &__descr {
    @include def-btn;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px;
    color: $navy;
    font-size: 16px;
    transition: 0.2s ease-in-out;
    border-radius: 70px;
    margin-right: 20px;
    &:hover {
      outline: 1px solid $gray-90;
      background-color: $gray-30;
    }
    &:active {
      background-color: $gray-50;
    }
  }
  &__dropdown {
    @include flexbox-column;
    margin: 0;
    padding: 0;
    list-style: none;
    .filter__item {
      padding: 5px;
      border: 1px solid $gray-50;
      cursor: pointer;
      user-select: none;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: $gray-30;
      }
      &:acitve {
        background-color: $gray-50;
      }
    }
  }
}
</style>
