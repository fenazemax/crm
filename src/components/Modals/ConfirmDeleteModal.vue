<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

const props = defineProps<{
  id: number
}>()
const emit = defineEmits<{
  (e: 'confirm', id: number): void
}>()

const confirmDelete = () => {
  emit('confirm', props.id)
}
</script>

<template>
  <div class="modal__confirmed">
    <p class="modal__descr">Do you wanna delete this?</p>
    <div class="modal__wrapper">
      <button class="modal__btn-cancel" @click="modalStore.closeModal()">Cancel</button>
      <button class="modal__btn-confirm" @click="confirmDelete">Yes</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.modal {
  &__confirmed {
    @include flexbox-column;
    padding: 0 34px;
    & > .modal__descr {
      padding: 20px;
      @include navy-descr;
    }
  }
  &__wrapper {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    gap: 20px;
    & > .modal__btn-confirm {
      @include modal-save-btn;
    }
    & > .modal__btn-cancel {
      @include modal-cancel-btn;
    }
  }
}
</style>
