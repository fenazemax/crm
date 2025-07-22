<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="custom-checkbox">
    <input type="checkbox" class="custom-checkbox__input" v-model="modelValue" />
    <span class="custom-checkbox__box">
      <svg
        class="checkmark"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.custom-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  &__input {
    display: none;
  }
  &__box {
    width: 24px;
    height: 24px;
    border: 2px solid $gray-90; // light-gray
    border-radius: 6px;
    background-color: $colorwhite;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s,
      border-color 0.2s;
    .checkmark {
      width: 14px;
      height: 14px;
      opacity: 0;
      transition: opacity 0.2s;
    }
  }
  &__input:checked + &__box {
    background-color: $primary-green;
    border-color: $primary-green;

    .checkmark {
      opacity: 1;
    }
  }
}
</style>
