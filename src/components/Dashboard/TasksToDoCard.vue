<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import dayjs from 'dayjs'
import { computed } from 'vue'
import StatusArrowIcon from '../Icons/StatusArrowIcon.vue'
import BaseModal from '../Modals/BaseModal.vue'
import { ModalType } from '@/types/modalType'
import { useModalStore } from '@/stores/modalStore'
import TaskModal from '../Modals/TaskModal.vue'

const taskStore = useTaskStore()
const modalStore = useModalStore()

const formatedTasks = computed(() => {
  return taskStore.allTasks
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)
})
</script>

<template>
  <div class="tasks" v-if="formatedTasks.length > 0">
    <div class="tasks__card">
      <div class="tasks__head">
        <h5 class="tasks__title">Tasks To Do</h5>
        <router-link to="/tasks" class="tasks__link">View All</router-link>
      </div>
      <div class="tasks__main">
        <div class="tasks__closest" v-for="task in formatedTasks" :key="task.id">
          <p class="tasks__date">{{ dayjs(task.date).format('DD MMM YYYY') }}</p>
          <p class="tasks__descr">{{ task.description.charAt(0).toUpperCase() + task.description.slice(1) }}</p>
        </div>
      </div>
      <div class="tasks__footer">
        <div class="tasks__container" @click="modalStore.openModal(ModalType.Todo)">
          <p class="tasks__add">Add new task</p>
          <StatusArrowIcon />
        </div>
      </div>
    </div>
  </div>
  <div class="no-tasks" v-else>
    <div class="no-tasks__container">
      <img src="/Tasks.png" alt="no-task" class="no-tasks__img" />
      <p class="no-tasks__descr">No upcoming tasks found.</p>
      <div class="tasks__container" @click="modalStore.openModal(ModalType.Todo)" style="cursor: pointer">
        <StatusArrowIcon />
      </div>
    </div>
  </div>

  <BaseModal :type="ModalType.Todo">
    <template #title> Add New Task </template>
    <TaskModal />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.tasks {
  padding: 34px;
  &__card {
    @include flexbox-column;
    gap: 34px;
    padding: 34px;
    background-color: $colorwhite;
    border-radius: 12px;
  }
  &__head {
    @include flexbox-between;
    & > .tasks__title {
      @include navy-descr;
    }
    & > .tasks__link {
      @include view-all;
    }
  }
  &__main {
    & > .tasks__closest {
      display: flex;
      gap: 34px;
      & > .tasks__date {
        font-size: 18px;
        color: $gray-70;
      }
      & > .tasks__descr {
        font-size: 18px;
        color: $navy;
      }
    }
  }
  &__footer {
    padding-top: 26px;
    border-top: 1px solid $bg-sidebar;
    & > .tasks__container {
      @include flexbox-between;
      cursor: pointer;
      align-items: center;
      & > .tasks__add {
        @include gray-descr;
      }
    }
  }
}

.no-tasks {
  padding: 34px;
  &__container {
    padding: 34px;
    background-color: $colorwhite;
    border-radius: 12px;
    display: flex;
    gap: 15px;
    align-items: center;
  }
  &__img {
    width: 34px;
    height: 34px;
  }
  &__descr {
    @include gray-descr;
  }
}
</style>
