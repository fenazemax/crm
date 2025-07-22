import type { IDeal } from '@/types/dealsType'
import { computed, type Ref } from 'vue'

export function useSortedDeals(array: IDeal[], sortKey: Ref<keyof IDeal>) {
  const sortedDeals = computed(() => {
    const key = sortKey.value
    return [...array].sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      let result = 0

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue
      } else if (aValue instanceof Date && bValue instanceof Date) {
        result = aValue.getTime() - bValue.getTime()
      } else {
        result = String(aValue).localeCompare(String(bValue))
      }
      return result
    })
  })
  return { sortedDeals }
}
