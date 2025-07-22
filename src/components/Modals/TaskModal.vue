<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'

const taskStore = useTaskStore()
const modalStore = useModalStore()
const closeModal = () => {
  modalStore.closeModal()
}
const newTaskDescription = ref('')
const newTaskDate = ref<Date | undefined>()

const saveModal = () => {
  if (!newTaskDate.value || !newTaskDescription.value) return
  taskStore.addTask({
    id: Date.now(),
    description: newTaskDescription.value,
    date: newTaskDate.value,
    complete: false,
  })
  newTaskDescription.value = ''
  newTaskDate.value = undefined
  closeModal()
}
</script>

<template>
  <textarea
    type="text"
    placeholder="Enter Task Description"
    class="modal__area"
    v-model="newTaskDescription"
  ></textarea>
  <div class="modal__date">
    <p class="modal__title">Due Date</p>
    <input type="date" placeholder="Enter Task Description" class="modal__input" v-model="newTaskDate" />
  </div>
  <div class="modal__wrapper-btn">
    <button class="modal__btn-cancel" @click="closeModal">Cancel</button>
    <button class="modal__btn-save" @click="saveModal">Save Task</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.modal {
  &__title {
    @include navy-descr;
    font-weight: 600;
  }
  &__area {
    width: 336px;
    height: 110px;
    margin: 12px 32px;
    border-radius: 8px;
    padding: 10px 20px;
    background-color: $gray-10;
    border: none;
    transition: 0.3s ease-in-out;
    &:hover {
      outline: 1px solid $gray-70;
    }
    &:focus {
      outline: 1px solid $gray-50;
    }
    &:active {
      outline: 1px solid $gray-90;
    }
  }
  &__date {
    @include flexbox-column;
    width: 400px;
    padding: 10px 32px;
    gap: 12px;
    & > .modal__input {
      background-color: $gray-10;
      width: 336px;
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      &:hover {
        outline: 1px solid $gray-70;
      }
      &:focus {
        outline: 1px solid $gray-50;
      }
      &:active {
        outline: 1px solid $gray-90;
      }
    }
  }
  &__wrapper-btn {
    display: flex;
    width: 400px;
    padding: 16px 32px;
    padding-bottom: 28px;
    justify-content: center;
    gap: 16px;
    & > .modal__btn-cancel {
      @include modal-cancel-btn;
    }
    & > .modal__btn-save {
      @include modal-save-btn;
    }
  }
}
</style>
