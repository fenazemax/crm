import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type IDeal } from '../types/dealsType'
import { useCustomerStore } from './customerStore'

export const useDealStore = defineStore(
  'dealsStore',
  () => {
    const userStore = useCustomerStore()

    const deals = ref<IDeal[]>([])

    function addDeal(deal: IDeal, customerId: number) {
      if (!deals.value.some((d) => d.id === deal.id)) deals.value.push(deal)
      const customer = userStore.customers.find((c) => c.cid === customerId)
      if (customer) {
        if (!customer.deals?.some((d) => d.id === deal.id)) {
          customer.deals?.push(deal)
        }
      }
    }

    function deleteDeal(dealId: number, customerId: number) {
      if (deals.value) {
        deals.value = deals.value.filter((d) => d.id !== dealId)
        userStore.deleteCustomerDeal(customerId, dealId)
      }
    }

    function updateDeal(newDeal: IDeal) {
      const index = deals.value.findIndex((deal) => deal.id === newDeal.id)
      if (index !== -1) {
        deals.value[index] = { ...deals.value[index], ...newDeal }
      }
    }

    return {
      deals,
      addDeal,
      deleteDeal,
      updateDeal,
    }
  },
  {
    persist: true,
  },
)
