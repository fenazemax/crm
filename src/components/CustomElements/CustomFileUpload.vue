<script setup lang="ts">
import { ref } from 'vue'
import { convertFileToBase64 } from '@/utils/fileToBase64'

const fileInput = ref<HTMLInputElement | null>(null)
const modelValue = defineModel<string>()

const triggerFileInput = () => {
  fileInput.value?.click()
}
const handleChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const base64 = await convertFileToBase64(file)
  modelValue.value = base64
}
</script>

<template>
  <div class="file">
    <input type="file" class="file__input" ref="fileInput" @change="handleChange" />
    <button class="file__btn" @click="triggerFileInput" type="button">ADD</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.file {
  @include flexbox-column;
  gap: 12px;

  &__input {
    display: none;
  }
  &__btn {
    max-width: 84px;
    padding: 10px 20px;
    color: $gray-70;
    font-size: 20px;
    background-color: $gray-10;
    border-radius: 8px;
    border: 1px solid $gray-30;
    cursor: pointer;
    &:hover {
      background-color: $gray-30;
    }
    &:focus {
      border: 1px solid $gray-90;
    }
    &:active {
      border: 1px solid $gray-90;
    }
  }
}
</style>
