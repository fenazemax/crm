import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ITask } from '@/types/tasksType'

export const useTaskStore = defineStore(
  'tasks',
  () => {
    const defaultTask = ref<ITask>({
      id: 0,
      description: 'clear house',
      date: new Date(2025, 6, 3),
      complete: false,
    })
    const allTasks = ref<ITask[]>([])

    function addTask(newTask: ITask) {
      const exists = allTasks.value.find((t) => t.id === newTask.id)
      if (!exists) {
        allTasks.value.push(newTask)
      } else {
        alert('this task already exists')
      }
    }

    function completeTask(taskId: number) {
      const task = allTasks.value.find((t) => t.id === taskId)
      if (task) task.complete = !task.complete
    }

    function updatedTask(task: ITask) {
      const index = allTasks.value.findIndex((t) => t.id === task.id)
      if (index !== -1) allTasks.value[index] = task
    }

    function deleteTask(taksId: number) {
      allTasks.value = allTasks.value.filter((t) => t.id !== taksId)
    }

    return {
      defaultTask,
      allTasks,
      addTask,
      completeTask,
      deleteTask,
      updatedTask,
    }
  },
  {
    persist: {
      key: 'my-task-store',
      storage: localStorage,
    },
  },
)
