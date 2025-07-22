import type { ICustomer } from '@/types/customerType'
import { computed, type Ref } from 'vue'

export function useSortedCustomers(array: ICustomer[], sortKey: Ref<keyof ICustomer>) {
  const sortedCustomers = computed(() => {
    const key = sortKey.value
    return [...array].sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      let result = 0

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue
      } else {
        result = String(aValue).localeCompare(String(bValue))
      }
      return result
    })
  })
  return { sortedCustomers }
}
