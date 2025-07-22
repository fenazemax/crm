import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ICustomer } from '../types/customerType'
import type { IDeal } from '@/types/dealsType'

export const useCustomerStore = defineStore(
  'customer',
  () => {
    const customers = ref<ICustomer[]>([])

    const addCustomer = (customer: ICustomer) => {
      customers.value.push(customer)
    }

    const deleteCustomer = (id: number) => {
      customers.value = customers.value.filter((c) => c.cid !== id)
    }

    const deleteCustomerDeal = (customerId: number, dealId: number) => {
      const customer = customers.value.find((c) => (c.cid = customerId))
      if (customer) {
        customer.deals = customer.deals?.filter((d) => d.id !== dealId)
      }
    }

    const addDealToCustomer = (deal: IDeal, customerId: number) => {
      const customer = customers.value.find((c) => (c.cid = customerId))
      if (customer) {
        customer.deals.push(deal)
      }
    }

    const updateCustomer = (newCustomer: ICustomer) => {
      const index = customers.value.findIndex((customer) => customer.cid === newCustomer.cid)
      if (index !== -1) {
        customers.value[index] = { ...customers.value[index], ...newCustomer }
      }
    }

    return {
      customers,
      addCustomer,
      deleteCustomer,
      deleteCustomerDeal,
      addDealToCustomer,
      updateCustomer,
    }
  },
  {
    persist: true,
  },
)
