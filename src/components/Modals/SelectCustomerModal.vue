<script setup lang="ts">
import { useCustomerStore } from '@/stores/customerStore'
import ArrowAdd from '../Icons/ArrowAdd.vue'
import type { ICustomer } from '@/types/customerType'
import { useModalStore } from '@/stores/modalStore'

const customerStore = useCustomerStore()
const modalStore = useModalStore()

const emit = defineEmits<{
  (e: 'update:modelValue', customer: ICustomer): void
}>()

const selectedCustomer = (nextCustomer: ICustomer) => {
  emit('update:modelValue', nextCustomer)
  console.log(nextCustomer)
  modalStore.closeModal()
}
</script>

<template>
  <div class="modal__main">
    <div class="all-customers" v-for="customer in customerStore.customers" :key="customer.cid">
      <button class="customer__choose" @click="selectedCustomer(customer)">
        <div class="customer__about">
          <img :src="customer.avatar" alt="avatar" class="customer__img" />
          <div class="customer__descr">
            <h5 class="customer__name">{{ customer.name }} {{ customer.secondname }}</h5>
            <p class="customer__title">{{ customer.email }}</p>
          </div>
        </div>
        <ArrowAdd />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.modal {
  .all-customers {
    & > .customer__choose {
      cursor: pointer;
      @include flexbox-between;
      align-items: center;
      gap: 50px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      & > .customer__about {
        display: flex;
        gap: 15px;
        & > .customer__img {
          width: 54px;
          height: 54px;
          border-radius: 25px;
        }
        & > .customer__descr {
          @include flexbox-column;
          & > .customer__title {
            @include gray-descr;
          }
          & > .customer__name {
            @include navy-descr;
            font-weight: 600;
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
