<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import type { ITask } from '@/types/tasksType'
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import CustomCheckbox from '../CustomElements/CustomCheckbox.vue'
import { ModalType } from '@/types/modalType'
import BaseModal from './BaseModal.vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
import { useTaskStore } from '@/stores/taskStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const modelValue = defineModel<ITask>({ required: true })
const editData = ref<ITask>(cloneDeep(modelValue.value))
const selectedTask = ref<ITask | null>(null)
const modalStore = useModalStore()
const taskStore = useTaskStore()
const saveChanges = () => {
  modelValue.value = editData.value
  taskStore.updatedTask(editData.value)
  modalStore.closeModal()
}

const openDeleteModal = (task: ITask) => {
  modalStore.openModal(ModalType.DeleteDeal)
  selectedTask.value = task
}
const deleteTask = (taskId: number) => {
  try {
    taskStore.deleteTask(taskId)
    modalStore.closeModal()
    router.push('/tasks')
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}
</script>

<template>
  <div class="modal__main">
    <div class="modal__bool">
      <p class="modal__descr">Complete?</p>
      <CustomCheckbox v-model="editData.complete" />
    </div>
    <div class="modal__date">
      <p class="modal__descr">Due Date</p>
      <input type="date" v-model="editData.date" class="modal__input" />
    </div>
    <div class="modal__task-descr">
      <p class="modal__descr">Description</p>
      <input type="text" class="modal__input" v-model="editData.description" />
    </div>
    <div class="modal__btn-wrapper">
      <button class="modal__btn-cancel" @click="openDeleteModal(editData)">Delete</button>
      <button class="modal__btn-save" @click="saveChanges">Done</button>
    </div>
  </div>

  <BaseModal :type="ModalType.DeleteDeal">
    <template #title>Delete Task</template>
    <ConfirmDeleteModal v-if="selectedTask" :id="selectedTask.id" @confirm="deleteTask" />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.modal {
  &__main {
    @include flexbox-column;
    padding: 34px;
    border-top: 1px solid $gray-50;
    gap: 20px;
    .modal__bool {
      display: flex;
      gap: 35px;
      align-items: center;
    }
    .modal__date,
    .modal__task-descr {
      @include flexbox-column;
      gap: 10px;
      .modal__input {
        @include modal__input-styles;
        color: $gray-90;
      }
    }
  }
  &__descr {
    @include navy-descr;
    font-weight: 600;
  }
  &__btn-wrapper {
    display: flex;
    gap: 24px;
    .modal__btn-save {
      @include modal-save-btn;
    }
    .modal__btn-cancel {
      @include modal-cancel-btn;
      color: $primary-pink;
    }
  }
}
</style>
