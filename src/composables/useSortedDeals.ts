import type { IDeal } from '@/types/dealsType'
import { computed, type Ref } from 'vue'

export function useSortedDeals(array: IDeal[], sortKey: Ref<keyof IDeal>, filterKey: Ref<string | null>) {
  const filteredSortedDeals = computed(() => {
    const key = sortKey.value
    const filter = filterKey.value

    return [...array]
      .filter((deal) => {
        if (!filter || filter === 'all') return true
        return deal.progress === filter
      })
      .sort((a, b) => {
        const aValue = a[key]
        const bValue = b[key]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime()
        }
        return String(aValue).localeCompare(String(bValue))
      })
  })

  return { filteredSortedDeals }
}
