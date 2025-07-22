import type { ITask } from '@/types/tasksType'
import { computed, type Ref } from 'vue'

export function useSortedTasks(array: ITask[], sortKey: Ref<keyof ITask>) {
  const sortedTasks = computed(() => {
    const key = sortKey.value
    return [...array].sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      let result = 0

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        result = Number(aValue) - Number(bValue)
      } else if (aValue instanceof Date && bValue instanceof Date) {
        result = aValue.getTime() - bValue.getTime()
      } else {
        result = String(aValue).localeCompare(String(bValue))
      }
      return result
    })
  })
  return { sortedTasks }
}
