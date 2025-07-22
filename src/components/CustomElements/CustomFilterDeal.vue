<script setup lang="ts">
import FilterBtnIcon from '../Icons/FilterBtnIcon.vue'
</script>

<template>
  <div class="filter">
    <button class="filter__descr">Filter <FilterBtnIcon /></button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.filter {
  display: flex;
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
}
</style>
