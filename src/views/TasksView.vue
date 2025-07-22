<script setup lang="ts">
import CustomFilterDeal from '@/components/CustomElements/CustomFilterDeal.vue'
import CustomSortDeal from '@/components/CustomElements/CustomSortDeal.vue'
import CompleteGrayIcon from '@/components/Icons/CompleteGrayIcon.vue'
import CompleteGreenIcon from '@/components/Icons/CompleteGreenIcon.vue'
import EditDealIcon from '@/components/Icons/EditDealIcon.vue'
import BaseModal from '@/components/Modals/BaseModal.vue'
import EdtiTaskModal from '@/components/Modals/EdtiTaskModal.vue'
import { useSortedTasks } from '@/composables/useSortedTasks'
import { useModalStore } from '@/stores/modalStore'
import { useTaskStore } from '@/stores/taskStore'
import type { TOptions } from '@/types/dealsType'
import { ModalType } from '@/types/modalType'
import type { ITask } from '@/types/tasksType'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const modalStore = useModalStore()
const taskStore = useTaskStore()
const selectedTask = ref<ITask | null>(null)
const sortedBy = ref<keyof ITask>('date')
const sortOptions: TOptions[] = [
  { label: 'Due date', value: 'date' },
  { label: 'Complete', value: 'complete' },
  { label: 'Description', value: 'description' },
]
const tasksCount = computed(() => taskStore.allTasks.length)
const { sortedTasks } = useSortedTasks(taskStore.allTasks, sortedBy)
const openEditModal = (task: ITask) => {
  modalStore.openModal(ModalType.EditModal)
  selectedTask.value = task
}
</script>

<template>
  <div class="tasks" v-if="tasksCount > 0">
    <div class="tasks__head">
      <p class="tasks__count">Total: {{ tasksCount }} tasks</p>
      <div class="tasks__sort-container">
        <CustomSortDeal v-model="sortedBy" :options="sortOptions" />
        <CustomFilterDeal />
      </div>
    </div>
    <ul class="tasks__list">
      <li class="tasks__item main-item">
        <div class="tasks__link">
          <div class="tasks__item-image">
            <CompleteGrayIcon />
          </div>
        </div>
        <p class="tasks__head-item">Due Date</p>
        <p class="tasks__head-item">Task</p>
        <p class="tasks__head-item">Edit</p>
      </li>
      <li class="tasks__item scroll-item" v-for="task in sortedTasks" :key="task.id">
        <div class="tasks__item-image">
          <span v-if="task.complete === true">
            <CompleteGreenIcon />
          </span>
        </div>
        <p class="tasks__name">{{ dayjs(task.date).format('DD MMM YYYY') }}</p>
        <p class="tasks__name">{{ task.description }}</p>
        <button class="task__btn" @click="openEditModal(task)">
          <EditDealIcon />
        </button>
      </li>
    </ul>
  </div>
  <div class="tasks-no" v-else>
    <img src="./Tasks.png" alt="No tasks" class="tasks-no__img" />
    <p class="tasks-no__descr">No tasks found</p>
  </div>
  <BaseModal :type="ModalType.EditModal">
    <template #title>Edit Task</template>
    <EdtiTaskModal v-if="selectedTask" v-model="selectedTask" />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.tasks {
  padding-left: 20px;
  padding-top: 20px;
  &__head {
    @include flexbox-between;
    margin-bottom: 34px;
    & > .tasks__count {
      @include navy-descr;
      font-weight: 600;
    }
    & > .tasks__sort-container {
      display: flex;
      gap: 20px;
    }
  }
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
    @include flexbox-column;
    & > .tasks__item {
      display: grid;
      grid-template-columns: 44px 400px 1000px 44px;
      gap: 20px;
      padding: 0 20px;
      &:nth-child(2) {
        margin-bottom: 20px;
      }
      & > .tasks__link {
        display: flex;
        gap: 30px;
        align-items: center;
        text-decoration: none;
      }
      & > .task__btn {
        @include def-btn;
      }
    }
    & > .tasks__load {
      @include def-btn;
      font-size: 20px;
      color: $bluecolor;
    }
  }
  &__head-item {
    @include gray-descr;
  }
  &__name {
    @include navy-descr;
    font-size: 20px;
  }
  &__item-image {
    width: 44px;
    height: 44px;
  }
}

.tasks-no {
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  left: 50%;
  gap: 20px;
  user-select: none;
  &__img {
    width: 34px;
    height: 34px;
  }
  &__descr {
    @include gray-descr;
    font-size: 24px;
  }
}
</style>
